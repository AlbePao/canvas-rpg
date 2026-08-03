import { Events } from '../../lib/Events';
import { fromGridSize, Game, GRID_SIZE } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { DIRECTION_TAP, userPressEnterKeys } from '../../lib/Input';
import { Vector2, type Coords2D } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import type { CollectibleItemData } from '../Item';
import { createItemSprite } from '../Item';
import { isSpaceFree } from '../Level';
import { MovableObject, moveTowards } from '../MovableObject';
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

    const { hFrames, vFrames, frameSize, position, resource } = GameRegistry.assets.get('hero');

    this.body = new Sprite({
      id: `${id}-hero-body-sprite`,
      resource,
      frameSize,
      hFrames,
      vFrames,
      position,
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
    if (userPressEnterKeys()) {
      const [x, y] = this.position.toNeighborCoords(this.facingDirection);

      // Look for an object at the next space (according to where Hero is facing)
      const objectAtPosition = Game.level?.getFirstObjectAt(x, y);

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
      if (this.facingDirection === 'left') {
        this.body.animations?.play('standLeft');
      }

      if (this.facingDirection === 'right') {
        this.body.animations?.play('standRight');
      }

      if (this.facingDirection === 'up') {
        this.body.animations?.play('standUp');
      }

      if (this.facingDirection === 'down') {
        this.body.animations?.play('standDown');
      }

      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    if (direction === 'down') {
      nextY += GRID_SIZE;
      this.body.animations?.play('walkDown');
    } else if (direction === 'up') {
      nextY -= GRID_SIZE;
      this.body.animations?.play('walkUp');
    } else if (direction === 'left') {
      nextX -= GRID_SIZE;
      this.body.animations?.play('walkLeft');
    } else if (direction === 'right') {
      nextX += GRID_SIZE;
      this.body.animations?.play('walkRight');
    }

    this.facingDirection = direction;

    // Validation that the next destination is free
    const spaceIsFree = isSpaceFree(nextX, nextY, level?.walls);
    // If there's an object in the cell where I want to go (that isn't the floor), it's blocked
    const isBlocked = level?.hasSolidObjectAt(nextX, nextY);

    if (spaceIsFree && !isBlocked) {
      this.setNewDestination(nextX, nextY); // O(1) automatic grid update
    }
  }

  private _onCollectItem(data: CollectibleItemData): void {
    const { frame, position, skipCollectAnimation } = data;

    // If the item has requested to skip the collect animation, just move there without any celebration
    if (skipCollectAnimation) {
      return;
    }

    // Make sure we land right on the item
    const targetPosition = position ?? this.position;
    this.setNewDestination(targetPosition.x, targetPosition.y);

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
