import { Events } from '../../lib/Events';
import { fromGridSize, Game, GRID_SIZE } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { DIRECTION_TAP } from '../../lib/Input';
import { Resources } from '../../lib/Resources';
import { Vector2, type Coords2D } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import type { CollectibleItemData } from '../Item';
import { createItemSprite } from '../Item';
import { isSpaceFree } from '../Level';
import { isPositionBlocked, MovableObject, moveTowards } from '../MovableObject';
import { Sprite } from '../Sprite';
import { HERO_COLLECTS_ITEM, HERO_POSITION, HERO_REQUESTS_ACTION } from './hero.constants';
import type { HeroConfig } from './hero.types';

export class Hero extends MovableObject {
  protected readonly body: Sprite;
  private _lastX?: number;
  private _lastY?: number;
  private _itemCollectTime = 0;
  private _itemCollectShell: GameObject | null = null;

  get gridCoords(): Coords2D {
    const { x, y } = this.position;

    return {
      x: fromGridSize(x),
      y: fromGridSize(y),
    };
  }

  constructor(config: HeroConfig) {
    super(config);

    const { id } = config;

    // Opt into being solid
    this.isSolid = true;

    // Shadow under feet is separated from body to stay in place when hero is doing some actions, like walking or jumping
    this.addChild(this.createShadowSprite(`${id}-hero-shadow-sprite`));

    this.body = new Sprite({
      id: `${id}-hero-body-sprite`,
      resource: Resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: this.createAnimations('hero'),
    });
    this.addChild(this.body);
  }

  override ready(): void {
    super.ready();

    // React to collecting an item
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

    // Lock movement if celebrating an item collect
    if (this._itemCollectTime > 0) {
      this._workOnItemCollect(delta);
      return;
    }

    // Check for input
    const {
      input: { getActionJustPressed },
    } = Game;

    if (getActionJustPressed('Space')) {
      // Look for an object at the next space (according to where Hero is facing)
      const objectAtPosition = this.parent?.children.find((child) =>
        child.position.matches(this.position.toNeighborCoords(this.facingDirection)),
      );

      if (objectAtPosition) {
        Events.emit<GameObject>(HERO_REQUESTS_ACTION, objectAtPosition);
      }
    }

    const distance = moveTowards(this, this.destinationPosition, this.walkingSpeed);
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
    const {
      input: { direction },
      level,
    } = Game;

    if (!direction) {
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

    if (direction === 'DOWN') {
      nextY += GRID_SIZE;
      this.body.animations?.play('walkDown');
    } else if (direction === 'UP') {
      nextY -= GRID_SIZE;
      this.body.animations?.play('walkUp');
    } else if (direction === 'LEFT') {
      nextX -= GRID_SIZE;
      this.body.animations?.play('walkLeft');
    } else if (direction === 'RIGHT') {
      nextX += GRID_SIZE;
      this.body.animations?.play('walkRight');
    }

    this.facingDirection = direction;

    // Validation that the next destination is free
    const spaceIsFree = isSpaceFree(nextX, nextY, level?.walls);
    const isBlocked = isPositionBlocked(this.parent?.children ?? [], nextX, nextY);

    if (spaceIsFree && !isBlocked) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  private _onCollectItem(data: CollectibleItemData): void {
    const { frame, position, skipCollectAnimation } = data;

    // If the item has requested to skip the collect animation, just move there without any celebration
    if (skipCollectAnimation) {
      return;
    }

    // Make sure we land right on the item
    this.destinationPosition = (position ?? this.position).duplicate();

    // Start the collect animation
    this._itemCollectTime = 500; // ms
    this._itemCollectShell = new GameObject({ id: `${this.id}-item-collect-shell` });
    this._itemCollectShell.addChild(createItemSprite(`${this.id}-item-collect-sprite`, frame, new Vector2(0, -36)));
    this.addChild(this._itemCollectShell);
  }

  private _workOnItemCollect(delta: number): void {
    this._itemCollectTime -= delta;
    this.body.animations?.play('collectDown');

    if (this._itemCollectTime <= 0) {
      this._itemCollectShell?.destroy();
    }
  }
}
