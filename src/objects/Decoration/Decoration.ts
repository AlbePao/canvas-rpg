import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { TILESET_FRAME_MAP } from '../../lib/Tileset';
import { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';
import type { DecorationConfig } from './decoration.types';

export class Decoration extends GameObject {
  readonly body: Sprite;

  constructor(config: DecorationConfig) {
    const { id, key, isSolid = false, drawLayer = null, x = 0, y = 0 } = config;

    super({
      id,
      x,
      y,
    });

    this.isSolid = isSolid;

    const frame = TILESET_FRAME_MAP[key];

    this.body = new Sprite({
      id,
      resource: Resources.images.tileset,
      frameSize: new Vector2(16, 16),
      hFrames: 16,
      vFrames: 9,
      frame,
    });
    this.addChild(this.body);

    // Mark decorations to render on top or bottom of characters
    this.drawLayer = drawLayer;
  }
}
