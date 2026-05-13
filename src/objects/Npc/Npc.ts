import { HERO_REQUESTS_ACTION, START_TEXT_BOX } from '../../constants/events';
import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { StoryFlags } from '../../lib/StoryFlags';
import type { TextContent, TextContentConfig } from '../../lib/StoryFlags/storyFlags.types';
import { Vector2 } from '../../lib/Vector2';
import { SpriteTextString } from '../SpriteTextString';
import type { NpcAnimationFrame, NpcConfig } from './npc-types';
import { STANDING_1, STANDING_2, STANDING_3, STANDING_4 } from './npcAnimations';

export class Npc extends GameObject {
  textContent: TextContentConfig[];
  textPortraitFrame: number;
  body: Sprite;

  constructor({ id, x, y, textConfig }: NpcConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    // Opt into being solid
    this.isSolid = true;

    // Say something when talking
    this.textContent = textConfig.content;
    this.textPortraitFrame = textConfig.portraitFrame;

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
      resource: Resources.images.knight,
      frameSize: new Vector2(32, 32),
      hFrames: 6,
      vFrames: 1,
      position: new Vector2(-8, -20),
      animations: new Animations<NpcAnimationFrame>({
        standing1: new FrameIndexPattern(STANDING_1),
        standing2: new FrameIndexPattern(STANDING_2),
        standing3: new FrameIndexPattern(STANDING_3),
        standing4: new FrameIndexPattern(STANDING_4),
      }),
    });
    this.addChild(this.body);
  }

  // TODO: stop animation when talking and face the hero direction
  override ready(): void {
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const content = this.getTextContent();

      if (!this.position.matches(position) || !content) {
        return;
      }

      // Potentially add a story flag
      if (content.addsFlag) {
        StoryFlags.add(content.addsFlag);
      }

      // Emit the textbox
      Events.emit<SpriteTextString>(
        START_TEXT_BOX,
        new SpriteTextString({
          id: `text-box-for-${this.id}`,
          portraitFrame: content.portraitFrame,
          string: content.string,
        }),
      );
    });
  }

  getTextContent(): TextContent | null {
    const match = StoryFlags.getRelevantScenario(this.textContent);

    if (!match) {
      console.warn('No matches found in this list!', this.textContent);
      return null;
    }

    return {
      portraitFrame: this.textPortraitFrame,
      string: match.string,
      addsFlag: match.addsFlag ?? null,
    };
  }
}
