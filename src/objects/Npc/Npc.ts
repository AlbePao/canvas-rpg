import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { storyFlags } from '../../StoryFlags';
import { Vector2 } from '../../Vector2';

export type NpcTextConfig = {
  portraitFrame: number;
  content: NpcContent[];
};

export type NpcContent = {
  string: string;
  requires: string[];
  bypass?: string[];
  addsFlag?: string;
};

export class Npc extends GameObject {
  textContent: NpcContent[];
  textPortraitFrame: number;

  constructor(x: number, y: number, textConfig: NpcTextConfig) {
    super({
      position: new Vector2(x, y),
    });

    // Opt into being solid
    this.isSolid = true;

    // Say something when talking
    this.textContent = textConfig.content;
    this.textPortraitFrame = textConfig.portraitFrame;

    // Shadow under feet
    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    // Body sprite
    const body = new Sprite({
      resource: resources.images.knight,
      frameSize: new Vector2(32, 32),
      hFrames: 2,
      vFrames: 1,
      position: new Vector2(-8, -20),
    });
    this.addChild(body);
  }

  getContent() {
    // Maybe expand with story flag logic, etc
    const match = storyFlags.getRelevantScenario(this.textContent);

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
