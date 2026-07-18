import { GRID_SIZE, toGridSize } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Resources } from '../../lib/Resources';
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

    const { baseFrame, size } = GameRegistry.getDecorationFrame(key);

    this.body = new Sprite({
      id,
      resource: Resources.images.tileset,
      frameSize: new Vector2(toGridSize(size?.x ?? 1), toGridSize(size?.y ?? 1)),
      frameOriginSize: new Vector2(GRID_SIZE, GRID_SIZE),
      hFrames: 52,
      vFrames: 25,
      frame: baseFrame,
      // Anchor `x`/`y` to the decoration's bottom row (its "feet"), extending the
      // artwork upward for decorations taller than 1 cell. Keeps Y-sorting and
      // collision (both based on this GameObject's own position) at ground level.
      position: new Vector2(0, size ? toGridSize(-(size.y - 1)) : 0),
    });
    this.addChild(this.body);

    // Mark decorations to render on top or bottom of characters
    this.drawLayer = drawLayer;
  }
}
