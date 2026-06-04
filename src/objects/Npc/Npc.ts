import { STANDING_DIRECTIONS } from '../../constants/animationDirections';
import {
  BEHAVIOR_END,
  HERO_PICKS_UP_ITEM,
  HERO_REQUESTS_ACTION,
  LEVEL_TRANSITION_END,
  LEVEL_TRANSITION_START,
  PAUSE_OFF,
  PAUSE_ON,
  TEXT_BOX_CLOSE,
  TEXT_BOX_OPEN,
} from '../../constants/events';
import { GRID_SIZE } from '../../constants/gridSize';
import { getHeroSiblingObject, isHeroObject } from '../../helpers/getHeroSiblingObject';
import { moveTowards } from '../../helpers/moveTowards';
import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import { InteractiveObject } from '../InteractiveObject';
import { ITEMS_SPRITE_FRAME, type CollectibleItemData, type ItemKey } from '../Item';
import { Sprite } from '../Sprite';
import { SpriteTextBox } from '../SpriteTextBox';
import type { NpcBehavior, NpcConfig } from './npc.types';
import {
  NPC_STAND_DOWN,
  NPC_STAND_LEFT,
  NPC_STAND_RIGHT,
  NPC_STAND_UP,
  NPC_WALK_DOWN,
  NPC_WALK_LEFT,
  NPC_WALK_RIGHT,
  NPC_WALK_UP,
} from './npcAnimations';

export class Npc extends InteractiveObject {
  body: Sprite;
  contentItem: ItemKey | null = null;
  isLocked = false;
  isWalking = false;
  walkingSpeed = 1;
  facingDirection: Directions = 'DOWN';
  destinationPosition: Vector2;

  constructor(config: NpcConfig) {
    super(config);

    const { id, npc } = config;

    // Opt into being solid
    this.isSolid = true;

    // Shadow under feet is separated from body to stay in place when npc is doing some actions, like walking or jumping
    const shadow = new Sprite({
      id: `${id}-npc-shadow-sprite`,
      resource: Resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    // Body sprite
    this.body = new Sprite({
      id: `${id}-npc-body-sprite`,
      resource: Resources.images[npc],
      frameSize: new Vector2(32, 32),
      hFrames: 4,
      vFrames: 4,
      position: new Vector2(-8, -20),
      animations: new Animations({
        standDown: new FrameIndexPattern(NPC_STAND_DOWN),
        standLeft: new FrameIndexPattern(NPC_STAND_LEFT),
        standRight: new FrameIndexPattern(NPC_STAND_RIGHT),
        standUp: new FrameIndexPattern(NPC_STAND_UP),
        walkDown: new FrameIndexPattern(NPC_WALK_DOWN),
        walkLeft: new FrameIndexPattern(NPC_WALK_LEFT),
        walkRight: new FrameIndexPattern(NPC_WALK_RIGHT),
        walkUp: new FrameIndexPattern(NPC_WALK_UP),
      }),
    });
    this.addChild(this.body);

    this.destinationPosition = this.position.duplicate();
  }

  override ready(): void {
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const content = this.getTextContent();
      const { x, y } = position;

      if (!this.position.matches([x, y]) || !content) {
        return;
      }

      const heroDirection = getHeroSiblingObject(this.parent)?.facingDirection;

      if (heroDirection === 'DOWN') {
        this._changeFacingDirection('UP');
      } else if (heroDirection === 'UP') {
        this._changeFacingDirection('DOWN');
      } else if (heroDirection === 'RIGHT') {
        this._changeFacingDirection('LEFT');
      } else if (heroDirection === 'LEFT') {
        this._changeFacingDirection('RIGHT');
      }

      const { addsFlag, portraitFrame, string, item } = content;

      // Potentially add a story flag
      if (addsFlag) {
        StoryFlags.add(addsFlag);
      }

      // Save locally the item to pick when text box is closed and hero satisfies the story flags
      if (item) {
        this.contentItem = item;
      }

      // Emit the textbox
      Events.emit<SpriteTextBox>(
        TEXT_BOX_OPEN,
        new SpriteTextBox({
          id: `text-box-for-${this.id}`,
          portraitFrame,
          string,
        }),
      );
    });

    Events.on(TEXT_BOX_CLOSE, this, () => {
      const resetDirection = this.behaviorConfig[this.behaviorIndex]?.direction ?? 'DOWN';
      this._changeFacingDirection(resetDirection);

      if (this.contentItem) {
        // Now hero can collect the item
        Events.emit<CollectibleItemData>(HERO_PICKS_UP_ITEM, {
          id: crypto.randomUUID(),
          frame: ITEMS_SPRITE_FRAME[this.contentItem],
          shouldSkipPickupAnimation: false,
        });
        // Reset the items once hero collects it
        this.contentItem = null;
      }
    });

    // Lock npc when game is paused, cutscene is playing or hero is changing level
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
  }

  override step(): void {
    if (!this.isWalking || this.isLocked) {
      return;
    }

    // Move towards the walk target
    const distance = moveTowards(this, this.destinationPosition, this.walkingSpeed);
    const hasArrived = distance <= 1;

    if (hasArrived) {
      this.isWalking = false;
      this.walkingSpeed = 1;
      this.position.x = this.destinationPosition.x;
      this.position.y = this.destinationPosition.y;
      Events.emit(BEHAVIOR_END, this.id);
    }
  }

  override startBehavior(behavior: NpcBehavior): void {
    const { type } = behavior;

    if (type === 'stand') {
      const { direction, duration } = behavior;

      if (!this.isLocked) {
        this._changeFacingDirection(direction);
      }

      if (duration) {
        this.scheduleTimeout(() => {
          Events.emit(BEHAVIOR_END, this.id);
        }, duration);
      }
    } else if (type === 'walk') {
      if (this.isLocked) {
        // this.body.animations?.stop();
        this.scheduleTimeout(() => {
          this.startBehavior(behavior);
        }, 10);

        return;
      }

      const { direction, speed } = behavior;

      // Calculate the walk target based on direction and distance
      let nextX = this.destinationPosition.x;
      let nextY = this.destinationPosition.y;

      if (direction === 'DOWN') {
        nextY += GRID_SIZE;
        this.body.animations?.play('walkDown');
      }
      if (direction === 'UP') {
        nextY -= GRID_SIZE;
        this.body.animations?.play('walkUp');
      }
      if (direction === 'LEFT') {
        nextX -= GRID_SIZE;
        this.body.animations?.play('walkLeft');
      }
      if (direction === 'RIGHT') {
        nextX += GRID_SIZE;
        this.body.animations?.play('walkRight');
      }

      this.walkingSpeed = speed ?? 1;
      this.facingDirection = direction;

      // Validate the walk target is free
      const solidBodyAtSpace = this.parent?.children.find((child) => {
        // Check if solid body is at the target position
        if (child.isSolid && child.position.x === nextX && child.position.y === nextY) {
          return true;
        }

        // Check if Hero is walking to that position (reserve the space)
        if (isHeroObject(child) && child.destinationPosition.x === nextX && child.destinationPosition.y === nextY) {
          return true;
        }

        return false;
      });

      if (solidBodyAtSpace) {
        this._changeFacingDirection(direction);
        this.scheduleTimeout(() => {
          this.startBehavior(behavior);
        }, 10);
        return;
      }

      this.isWalking = true;
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  private _changeFacingDirection(direction: Directions): void {
    this.facingDirection = direction;
    this.body.animations?.play(STANDING_DIRECTIONS[direction]);
  }
}
