import { STANDING_DIRECTIONS } from '../../constants/animationDirections';
import {
  BEHAVIOR_COMPLETE,
  END_LEVEL_TRANSITION,
  END_PAUSE,
  END_TEXT_BOX,
  HERO_PICKS_UP_ITEM,
  HERO_REQUESTS_ACTION,
  START_LEVEL_TRANSITION,
  START_PAUSE,
  START_TEXT_BOX,
} from '../../constants/events';
import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import { Hero } from '../Hero';
import { InteractiveObject } from '../InteractiveObject';
import { ITEMS_SPRITE_FRAME, type CollectibleItemData, type ItemKey } from '../Item';
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
  facingDirection: Directions = 'DOWN';
  destinationPosition: Vector2;

  constructor(config: NpcConfig) {
    super(config);

    const { id, npc } = config;

    // Opt into being solid
    this.isSolid = true;

    // Shadow under feet
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

      if (!this.position.matches(position) || !content) {
        return;
      }

      const heroDirection = this.parent?.children.find((child) => child instanceof Hero)?.facingDirection;

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
        START_TEXT_BOX,
        new SpriteTextBox({
          id: `text-box-for-${this.id}`,
          portraitFrame,
          string,
        }),
      );
    });

    Events.on(END_TEXT_BOX, this, () => {
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
    [START_PAUSE, START_TEXT_BOX, START_LEVEL_TRANSITION].forEach((event) => {
      Events.on(event, this, () => (this.isLocked = true));
    });
    [END_PAUSE, END_TEXT_BOX, END_LEVEL_TRANSITION].forEach((event) => {
      Events.on(event, this, () => (this.isLocked = false));
    });
  }

  override startBehavior(behavior: NpcBehavior): void {
    const { type } = behavior;

    if (type === 'stand') {
      const { direction, duration } = behavior;

      if (!this.isLocked) {
        this._changeFacingDirection(direction);
      }

      if (duration) {
        setTimeout(() => {
          Events.emit(BEHAVIOR_COMPLETE, this.id);
        }, duration);
      }
    } else if (type === 'walk') {
      // TODO: add walk behavior
    }
  }

  private _changeFacingDirection(direction: Directions): void {
    this.facingDirection = direction;
    this.body.animations?.play(STANDING_DIRECTIONS[direction]);
  }
}
