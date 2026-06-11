import { gridCells } from '../../helpers/grid';
import { GameObject } from '../../lib/GameObject';
import { TILESET_FRAME_MAP } from '../../lib/LevelBuilder/tilesetFrameMap';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';
import type { DecorationConfig } from './decoration.types';

export class Decoration extends GameObject {
  readonly body: Sprite;

  constructor(config: DecorationConfig) {
    const { id, key, isSolid, drawLayer = null, x = 0, y = 0 } = config;

    super({
      id,
    });

    const frame = TILESET_FRAME_MAP[key];

    this.body = new Sprite({
      id,
      resource: Resources.images.tileset,
      frameSize: new Vector2(16, 16),
      hFrames: 16,
      vFrames: 9,
      frame,
      position: new Vector2(gridCells(x), gridCells(y)),
    });

    this.isSolid = !!isSolid;

    // Mark decorations to render on top or bottom of characters
    this.drawLayer = drawLayer;
  }
}
