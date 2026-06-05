import { GRID_SIZE } from '../../constants/gridSize';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';
import type { BackdropBoxConfig } from './backdropBox.types';

function createBackdropFrames(): Sprite[] {
  // Create the 9 frames from the textBox sheet (3x3 grid, each frame is GRID_SIZE x GRID_SIZE)
  const frameArray: Sprite[] = [];
  for (let i = 0; i < 9; i++) {
    frameArray[i] = new Sprite({
      id: `backdrop-frame-${i}`,
      resource: Resources.images.textBox,
      frameSize: new Vector2(GRID_SIZE, GRID_SIZE),
      hFrames: 3,
      vFrames: 3,
      frame: i,
    });
  }

  return frameArray;
}

/**
 * BackdropBox generates a composited textured box using a 3x3 grid sprite.
 * The sprite layout is:
 * 0=top-left, 1=top-center, 2=top-right,
 * 3=left, 4=center, 5=right,
 * 6=bottom-left, 7=bottom-center, 8=bottom-right
 *
 * Each frame is 16x16 pixels (GRID_SIZE).
 * Borders are 1 cell thick; interior is tiled with center sprite.
 */
export class BackdropBox extends GameObject {
  private _width: number; // Width in grid cells
  private _height: number; // Height in grid cells
  private readonly _frames = createBackdropFrames();

  constructor(config: BackdropBoxConfig) {
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
    const baseX = drawPosX + this.position.x;
    const baseY = drawPosY + this.position.y;

    // Draw top row
    this._frames[0].drawImage(ctx, baseX, baseY); // Top-left
    for (let col = 1; col < this._width - 1; col++) {
      this._frames[1].drawImage(ctx, baseX + col * GRID_SIZE, baseY); // Top-center
    }
    this._frames[2].drawImage(ctx, baseX + (this._width - 1) * GRID_SIZE, baseY); // Top-right

    // Draw middle rows
    for (let row = 1; row < this._height - 1; row++) {
      this._frames[3].drawImage(ctx, baseX, baseY + row * GRID_SIZE); // Left
      for (let col = 1; col < this._width - 1; col++) {
        this._frames[4].drawImage(ctx, baseX + col * GRID_SIZE, baseY + row * GRID_SIZE); // Center
      }
      this._frames[5].drawImage(ctx, baseX + (this._width - 1) * GRID_SIZE, baseY + row * GRID_SIZE); // Right
    }

    // Draw bottom row
    this._frames[6].drawImage(ctx, baseX, baseY + (this._height - 1) * GRID_SIZE); // Bottom-left
    for (let col = 1; col < this._width - 1; col++) {
      this._frames[7].drawImage(ctx, baseX + col * GRID_SIZE, baseY + (this._height - 1) * GRID_SIZE); // Bottom-center
    }
    this._frames[8].drawImage(ctx, baseX + (this._width - 1) * GRID_SIZE, baseY + (this._height - 1) * GRID_SIZE); // Bottom-right
  }
}
