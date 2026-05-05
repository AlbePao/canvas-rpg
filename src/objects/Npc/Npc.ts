import { Animations } from '../../Animations';
import { START_TEXT_BOX } from '../../constants/events';
import { Events } from '../../Events';
import { FrameIndexPattern } from '../../FrameIndexPattern';
import { GameObject } from '../../GameObject';
import { Resources } from '../../Resources';
import { Sprite } from '../../Sprite';
import { StoryFlags } from '../../StoryFlags';
import { Vector2 } from '../../Vector2';
import { NpcAnimationFrame, NpcConfig, NpcContent } from './npc-types';
import { STANDING_1, STANDING_2, STANDING_3, STANDING_4 } from './npcAnimations';

export class Npc extends GameObject {
  textContent: NpcContent[];
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
  ready(): void {
    Events.on(START_TEXT_BOX, this, () => {});
  }

  getContent() {
    // Maybe expand with story flag logic, etc
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
