import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';

export class Npc extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    // Opt into being solid
    this.isSolid = true;

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
}
