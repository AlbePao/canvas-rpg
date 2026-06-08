import { STANDING_DIRECTIONS } from '../../constants/animationDirections';
import {
  DIRECTION_TAP,
  HERO_PICKS_UP_ITEM,
  HERO_POSITION,
  HERO_REQUESTS_ACTION,
  LEVEL_TRANSITION_END,
  LEVEL_TRANSITION_START,
  PAUSE_OFF,
  PAUSE_ON,
  TEXT_BOX_CLOSE,
  TEXT_BOX_OPEN,
} from '../../constants/events';
import { GRID_SIZE } from '../../constants/gridSize';
import { createItemSprite } from '../../helpers/createItemSprite';
import { isSpaceFree } from '../../helpers/grid';
import { moveTowards } from '../../helpers/moveTowards';
import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import type { CollectibleItemData } from '../Item';
import type { Main } from '../Main';
import { Npc } from '../Npc';
import { Sprite } from '../Sprite';
import type { HeroConfig } from './hero.types';
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
} from './heroAnimations';

export class Hero extends GameObject {
  facingDirection: Directions = 'DOWN';
  body: Sprite;
  destinationPosition: Vector2;
  lastX?: number;
  lastY?: number;
  itemPickUpTime = 0;
  itemPickUpShell: GameObject | null = null;
  isLocked = false;
  walkingSpeed = 1;

  constructor(config: HeroConfig) {
    super(config);

    const { id } = config;

    // Opt into being solid
    this.isSolid = true;

    const shadow = new Sprite({
      id: `${id}-hero-shadow-sprite`,
      resource: Resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

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

    this.destinationPosition = this.position.duplicate();

    // React to picking up an item
    Events.on<CollectibleItemData>(HERO_PICKS_UP_ITEM, this, (data) => {
      this.onPickUpItem(data);
    });
  }

  override ready(): void {
    // Lock hero when game is paused, cutscene is playing or is changing level
    [PAUSE_ON, TEXT_BOX_OPEN, LEVEL_TRANSITION_START].forEach((event) => {
      Events.on(event, this, () => {
        this.isLocked = true;
        // Freeze animation
        this.body.animations?.pause();
      });
    });
    [PAUSE_OFF, TEXT_BOX_CLOSE, LEVEL_TRANSITION_END].forEach((event) => {
      Events.on(event, this, () => {
        this.isLocked = false;
        // Resume animation
        this.body.animations?.resume();
      });
    });

    // Turn to face direction when user taps a direction key without holding
    Events.on<Directions>(DIRECTION_TAP, this, (direction) => {
      if (this.isLocked) {
        return;
      }

      this._changeFacingDirection(direction);
    });
  }

  override step(delta: number, root: Main): void {
    // Don't do anything when locked
    if (this.isLocked) {
      return;
    }

    // Lock movement if celebrating an item pickup
    if (this.itemPickUpTime > 0) {
      this._workOnItemPickUp(delta);
      return;
    }

    // Check for input
    const { input } = root;

    if (input.getActionJustPressed('Space')) {
      // Look for an object at the next space (according to where Hero is facing)
      const objectAtPosition = this.parent?.children.find((child) =>
        child.position.matches(this.position.toNeighborCoords(this.facingDirection)),
      );

      if (objectAtPosition) {
        Events.emit(HERO_REQUESTS_ACTION, objectAtPosition);
      }
    }

    const distance = moveTowards(this, this.destinationPosition, this.walkingSpeed);
    const hasArrived = distance <= 1;

    // Attempt to move again if the hero is at his position
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition(): void {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }

    this.lastX = this.position.x;
    this.lastY = this.position.y;

    Events.emit<Vector2>(HERO_POSITION, this.position);
  }

  protected tryMove(root: Main): void {
    const { input, level } = root;

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
      nextY += GRID_SIZE;
      this.body.animations?.play('walkDown');
    }
    if (input.direction === 'UP') {
      nextY -= GRID_SIZE;
      this.body.animations?.play('walkUp');
    }
    if (input.direction === 'LEFT') {
      nextX -= GRID_SIZE;
      this.body.animations?.play('walkLeft');
    }
    if (input.direction === 'RIGHT') {
      nextX += GRID_SIZE;
      this.body.animations?.play('walkRight');
    }

    this.facingDirection = input.direction;

    // Validation that the next destination is free
    const spaceIsFree = level && isSpaceFree(level.walls, nextX, nextY);
    const solidBodyAtSpace = this.parent?.children.find((child) => {
      // Check if solid body is at the target position
      if (child.isSolid && child.position.x === nextX && child.position.y === nextY) {
        return true;
      }

      // Check if NPC is walking to that position (reserve the space)
      if (child instanceof Npc && child.destinationPosition.x === nextX && child.destinationPosition.y === nextY) {
        return true;
      }

      return false;
    });

    if (spaceIsFree && !solidBodyAtSpace) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  onPickUpItem(data: CollectibleItemData): void {
    const { frame, position, shouldSkipPickupAnimation } = data;

    // If the item has requested to skip the pickup animation, just move there without any celebration
    if (shouldSkipPickupAnimation) {
      return;
    }

    // Make sure we land right on the item
    this.destinationPosition = position?.duplicate() ?? this.position.duplicate();

    // Start the pickup animation
    this.itemPickUpTime = 500; // ms
    this.itemPickUpShell = new GameObject({ id: `${this.id}-item-pickup-shell` });
    this.itemPickUpShell.addChild(
      createItemSprite({
        id: `${this.id}-item-pickup-sprite`,
        frame,
        position: new Vector2(0, -36),
      }),
    );
    this.addChild(this.itemPickUpShell);
  }

  private _workOnItemPickUp(delta: number): void {
    this.itemPickUpTime -= delta;
    this.body.animations?.play('pickUpDown');

    if (this.itemPickUpTime <= 0) {
      this.itemPickUpShell?.destroy();
    }
  }

  private _changeFacingDirection(direction: Directions): void {
    this.facingDirection = direction;
    this.body.animations?.play(STANDING_DIRECTIONS[direction]);
  }
}
