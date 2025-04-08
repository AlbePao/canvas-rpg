import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';

export type NpcTextConfig = {
  portraitFrame: number;
  content: string;
};

export class Npc extends GameObject {
  textContent: string;
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
    return {
      portraitFrame: this.textPortraitFrame,
      string: this.textContent,
    };
  }
}
