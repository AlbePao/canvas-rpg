import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { DIRECTION_TAP } from '../../lib/Input';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import type { Coords2D } from '../../types/coords';
import type { Directions } from '../../types/directions';
import type { CollectibleItemData } from '../Item';
import { createItemSprite } from '../Item';
import { isPositionBlocked, MovableObject } from '../MovableObject';
import { Sprite } from '../Sprite';
import {
  HERO_PICK_UP_DOWN,
  HERO_STAND_DOWN,
  HERO_STAND_LEFT,
  HERO_STAND_RIGHT,
  HERO_STAND_UP,
  HERO_WALK_DOWN,
  HERO_WALK_LEFT,
  HERO_WALK_RIGHT,
  HERO_WALK_UP,
} from './hero.animations';
import { HERO_COLLECTS_ITEM, HERO_POSITION, HERO_REQUESTS_ACTION } from './hero.constants';
import type { HeroConfig } from './hero.types';

export class Hero extends MovableObject {
  protected readonly body: Sprite;
  private _lastX?: number;
  private _lastY?: number;
  private _itemPickUpTime = 0;
  private _itemPickUpShell: GameObject | null = null;

  get gridCoords(): Coords2D {
    const { x, y } = this.position;

    return {
      x: Game.fromGridSize(x),
      y: Game.fromGridSize(y),
    };
  }

  constructor(config: HeroConfig) {
    // Hero isn't a dialogue-bearing object, so give MovableObject/InteractiveObject an empty interaction config
    super({
      ...config,
      interactionConfig: { content: [] },
    });

    const { id } = config;

    // Opt into being solid
    this.isSolid = true;

    this.addChild(this.createShadowSprite(`${id}-hero-shadow-sprite`));

    this.body = new Sprite({
      id: `${id}-hero-body-sprite`,
      resource: Resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(HERO_WALK_DOWN),
        walkUp: new FrameIndexPattern(HERO_WALK_UP),
        walkLeft: new FrameIndexPattern(HERO_WALK_LEFT),
        walkRight: new FrameIndexPattern(HERO_WALK_RIGHT),
        standDown: new FrameIndexPattern(HERO_STAND_DOWN),
        standUp: new FrameIndexPattern(HERO_STAND_UP),
        standLeft: new FrameIndexPattern(HERO_STAND_LEFT),
        standRight: new FrameIndexPattern(HERO_STAND_RIGHT),
        pickUpDown: new FrameIndexPattern(HERO_PICK_UP_DOWN),
      }),
    });
    this.addChild(this.body);
  }

  override ready(): void {
    super.ready();

    // React to picking up an item
    Events.on<CollectibleItemData>(HERO_COLLECTS_ITEM, this, (data) => {
      this._onCollectItem(data);
    });

    // Turn to face direction when player taps a direction key without holding
    Events.on<Directions>(DIRECTION_TAP, this, (direction) => {
      if (this.isLocked) {
        return;
      }

      this.changeFacingDirection(direction);
    });
  }

  override step(delta: number): void {
    // Don't do anything when locked
    if (this.isLocked) {
      return;
    }

    // Lock movement if celebrating an item pickup
    if (this._itemPickUpTime > 0) {
      this._workOnItemPickUp(delta);
      return;
    }

    // Check for input
    const { input } = Game;

    if (input.getActionJustPressed('Space')) {
      // Look for an object at the next space (according to where Hero is facing)
      const objectAtPosition = this.parent?.children.find((child) =>
        child.position.matches(this.position.toNeighborCoords(this.facingDirection)),
      );

      if (objectAtPosition) {
        Events.emit<GameObject>(HERO_REQUESTS_ACTION, objectAtPosition);
      }
    }

    const distance = Game.moveTowards(this, this.destinationPosition, this.walkingSpeed);
    const hasArrived = distance <= 1;

    // Attempt to move again if the hero is at his position
    if (hasArrived) {
      this.tryMove();
    }

    this._tryEmitPosition();
  }

  private _tryEmitPosition(): void {
    if (this._lastX === this.position.x && this._lastY === this.position.y) {
      return;
    }

    this._lastX = this.position.x;
    this._lastY = this.position.y;

    Events.emit<Vector2>(HERO_POSITION, this.position);
  }

  protected tryMove(): void {
    const { input, level } = Game;

    if (!input.direction) {
      if (this.facingDirection === 'LEFT') {
        this.body.animations?.play('standLeft');
      }

      if (this.facingDirection === 'RIGHT') {
        this.body.animations?.play('standRight');
      }

      if (this.facingDirection === 'UP') {
        this.body.animations?.play('standUp');
      }

      if (this.facingDirection === 'DOWN') {
        this.body.animations?.play('standDown');
      }

      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    if (input.direction === 'DOWN') {
      nextY += Game.gridSize;
      this.body.animations?.play('walkDown');
    }
    if (input.direction === 'UP') {
      nextY -= Game.gridSize;
      this.body.animations?.play('walkUp');
    }
    if (input.direction === 'LEFT') {
      nextX -= Game.gridSize;
      this.body.animations?.play('walkLeft');
    }
    if (input.direction === 'RIGHT') {
      nextX += Game.gridSize;
      this.body.animations?.play('walkRight');
    }

    this.facingDirection = input.direction;

    // Validation that the next destination is free
    const spaceIsFree = level && Game.isSpaceFree(level.walls, nextX, nextY);
    const isBlocked = isPositionBlocked(this.parent?.children ?? [], nextX, nextY);

    if (spaceIsFree && !isBlocked) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  private _onCollectItem(data: CollectibleItemData): void {
    const { frame, position, skipCollectAnimation } = data;

    // If the item has requested to skip the pickup animation, just move there without any celebration
    if (skipCollectAnimation) {
      return;
    }

    // Make sure we land right on the item
    this.destinationPosition = position?.duplicate() ?? this.position.duplicate();

    // Start the pickup animation
    this._itemPickUpTime = 500; // ms
    this._itemPickUpShell = new GameObject({ id: `${this.id}-item-pickup-shell` });
    this._itemPickUpShell.addChild(createItemSprite(`${this.id}-item-pickup-sprite`, frame, new Vector2(0, -36)));
    this.addChild(this._itemPickUpShell);
  }

  private _workOnItemPickUp(delta: number): void {
    this._itemPickUpTime -= delta;
    this.body.animations?.play('pickUpDown');

    if (this._itemPickUpTime <= 0) {
      this._itemPickUpShell?.destroy();
    }
  }
}
