import type { Animations } from '../../lib/Animations';
import type { Resource } from '../../lib/Resources';
import type { Vector2 } from '../../lib/Vector2';

export type SpriteConfig = {
  id: string;
  resource: Resource;
} & Partial<{
  frameSize: Vector2;
  /**
   * Size of a single grid cell used to locate `frame`'s top-left corner in the sheet.
   * Defaults to `frameSize`. Pass a smaller fixed value (e.g. the tileset's 16x16 base
   * cell) when `frameSize` is bigger than one cell, so a sprite can crop a contiguous
   * multi-cell region (e.g. a decoration spanning 2x3 tiles) without breaking the
   * frame-index math, which is still expressed in base-cell units.
   */
  frameOriginSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  scale: number;
  position: Vector2;
  animations: Animations | null;
}>;
