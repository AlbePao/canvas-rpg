import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';
import type { BoxBackdropConfig } from './boxBackdrop.types';

function createBackdropFrames(): Sprite[] {
  const gridSize = Game.getGridSize();

  // Create the 9 frames from the textBox sheet (3x3 grid, each frame is gridSize x gridSize)
  const frameArray: Sprite[] = [];
  for (let i = 0; i < 9; i++) {
    frameArray[i] = new Sprite({
      id: `backdrop-frame-${i}`,
      resource: Resources.images.textBox,
      frameSize: new Vector2(gridSize, gridSize),
      hFrames: 3,
      vFrames: 3,
      frame: i,
    });
  }

  return frameArray;
}

/**
 * BoxBackdrop generates a composited textured box using a 3x3 grid sprite.
 * The sprite layout is:
 * 0=top-left, 1=top-center, 2=top-right,
 * 3=left, 4=center, 5=right,
 * 6=bottom-left, 7=bottom-center, 8=bottom-right
 *
 * Each frame is 16x16 pixels.
 * Borders are 1 cell thick; interior is tiled with center sprite.
 */
export class BoxBackdrop extends GameObject {
  private _width: number; // Width in grid cells
  private _height: number; // Height in grid cells
  private readonly _frames = createBackdropFrames();

  constructor(config: BoxBackdropConfig) {
    const { id, x = 0, y = 0, width, height } = config;

    super({
      id,
      x,
      y,
    });

    this._width = width;
    this._height = height;
  }

  updateSize(width: number, height: number): void {
    this._width = width;
    this._height = height;
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    const { toGridSize } = Game;
    const baseX = drawPosX + this.position.x;
    const baseY = drawPosY + this.position.y;

    // Draw top row
    this._frames[0].drawImage(ctx, baseX, baseY); // Top-left
    for (let col = 1; col < this._width - 1; col++) {
      this._frames[1].drawImage(ctx, baseX + toGridSize(col), baseY); // Top-center
    }
    this._frames[2].drawImage(ctx, baseX + toGridSize(this._width - 1), baseY); // Top-right

    // Draw middle rows
    for (let row = 1; row < this._height - 1; row++) {
      this._frames[3].drawImage(ctx, baseX, baseY + toGridSize(row)); // Left
      for (let col = 1; col < this._width - 1; col++) {
        this._frames[4].drawImage(ctx, baseX + toGridSize(col), baseY + toGridSize(row)); // Center
      }
      this._frames[5].drawImage(ctx, baseX + toGridSize(this._width - 1), baseY + toGridSize(row)); // Right
    }

    // Draw bottom row
    this._frames[6].drawImage(ctx, baseX, baseY + toGridSize(this._height - 1)); // Bottom-left
    for (let col = 1; col < this._width - 1; col++) {
      this._frames[7].drawImage(ctx, baseX + toGridSize(col), baseY + toGridSize(this._height - 1)); // Bottom-center
    }
    this._frames[8].drawImage(ctx, baseX + toGridSize(this._width - 1), baseY + toGridSize(this._height - 1)); // Bottom-right
  }
}
