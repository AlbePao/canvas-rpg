import type { GameObjectConfig, GameObjectDrawLayer } from '../../lib/GameObject';
import type { LevelDecorationTileName } from '../../lib/Tileset';
import type { Coords2D } from '../../lib/Vector2';

export type DecorationConfig = GameObjectConfig & {
  key: LevelDecorationTileName;
  isSolid?: boolean;
  drawLayer?: GameObjectDrawLayer;
};

export interface DecorationFrames {
  baseFrame: number;
  /**
   * Size of this decoration in grid cells (e.g. `{ x: 1, y: 2 }` for a decoration that's
   * 16px wide and 32px tall). Defaults to `{ x: 1, y: 1 }` (16x16). `key` must point at the
   * decoration's top-left cell, and the full region must be contiguous in the tileset image.
   */
  size?: Coords2D;
}
