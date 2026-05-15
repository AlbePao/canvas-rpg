import {
  END_LEVEL_TRANSITION,
  END_TEXT_BOX,
  HERO_PICKS_UP_ITEM,
  HERO_REQUESTS_ACTION,
  START_LEVEL_TRANSITION,
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
import { Hero } from '../Hero';
import { InteractiveObject } from '../InteractiveObject';
import { type CollectibleItemData, type ItemKey, ITEMS_SPRITE_FRAME } from '../Item';
import type { Main } from '../Main';
import { SpriteTextBox } from '../SpriteTextBox';
import type { NpcConfig } from './npc.types';
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

// TODO: add npc behavior
export class Npc extends InteractiveObject {
  body: Sprite;
  contentItem: ItemKey | null = null;
  isLocked = false;

  constructor({ id, x, y, interactionConfig, npc }: NpcConfig) {
    super({
      id,
      x,
      y,
      interactionConfig,
    });

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
  }

  override ready(): void {
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const content = this.getTextContent();

      if (!this.position.matches(position) || !content) {
        return;
      }

      const heroDirection = this.parent?.children.find((child) => child instanceof Hero)?.facingDirection;

      if (heroDirection === 'DOWN') {
        this.body.animations?.play('standUp');
      } else if (heroDirection === 'UP') {
        this.body.animations?.play('standDown');
      } else if (heroDirection === 'RIGHT') {
        this.body.animations?.play('standLeft');
      } else if (heroDirection === 'LEFT') {
        this.body.animations?.play('standRight');
      }

      // Potentially add a story flag
      if (content.addsFlag) {
        StoryFlags.add(content.addsFlag);
      }

      // Save locally the item to pick when text box is closed and hero satisfies the story flags
      if (content.item) {
        this.contentItem = content.item;
      }

      // Emit the textbox
      Events.emit<SpriteTextBox>(
        START_TEXT_BOX,
        new SpriteTextBox({
          id: `text-box-for-${this.id}`,
          portraitFrame: content.portraitFrame,
          string: content.string,
        }),
      );
    });

    Events.on(END_TEXT_BOX, this, () => {
      this.body.animations?.play('standDown');

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

    [START_TEXT_BOX, START_LEVEL_TRANSITION].forEach((event) => {
      Events.on(event, this, () => (this.isLocked = true));
    });
    [END_TEXT_BOX, END_LEVEL_TRANSITION].forEach((event) => {
      Events.on(event, this, () => (this.isLocked = false));
    });
  }

  override step(_delta: number, root: Main): void {
    const { isPaused, isCutscenePlaying } = root;
    // Don't do anything when locked, game is paused or cutscene is playing
    if (this.isLocked || isPaused || isCutscenePlaying) {
      return;
    }
  }
}
