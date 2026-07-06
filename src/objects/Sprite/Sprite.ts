import type { Animations } from '../../lib/Animations';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import type { Resource } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import type { Coords2D } from '../../types/coords';
import type { SpriteConfig } from './sprite.types';

export class Sprite extends GameObject {
  private readonly _resource: Resource;
  private readonly _frameSize: Vector2;
  private readonly _hFrames: number;
  readonly vFrames: number;
  frame: number;
  private readonly _scale: number;
  readonly animations: Animations | null;

  constructor({
    id, // id for the sprite
    resource, // image we want to draw,
    frameSize, // size of the crop of the image
    hFrames, // how the sprite arranged horizontally
    vFrames, // how the sprite arranged vertically
    frame, // which frame we want to show
    scale, // how large to draw this image
    position, // where to draw it (from top left corner)
    animations,
  }: SpriteConfig) {
    super({
      id,
    });

    const { gridSize } = Game;

    this._resource = resource;
    this._frameSize = frameSize ?? new Vector2(gridSize, gridSize);
    this._hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this._scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.animations = animations ?? null;
  }

  override step(delta: number): void {
    if (!this.animations) {
      return;
    }

    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  // Calculate frame coordinates on-the-fly without allocations
  private _getFrameCoordinates(frameIndex: number): Coords2D {
    const frameX = frameIndex % this._hFrames;
    const frameY = Math.floor(frameIndex / this._hFrames);
    return {
      x: frameX * this._frameSize.x,
      y: frameY * this._frameSize.y,
    };
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    if (!this._resource.isLoaded) {
      return;
    }

    // Calculate frame coordinates without allocating Vector2
    const { x, y } = this._getFrameCoordinates(this.frame);

    const frameSizeX = this._frameSize.x;
    const frameSizeY = this._frameSize.y;

    ctx.drawImage(
      this._resource.image,
      x, // Top X corner of frame
      y, // Top Y corner of frame
      frameSizeX, // How much to crop from the sprite sheet (X)
      frameSizeY, // How much to crop from the sprite sheet (Y)
      drawPosX, // Where to place this on canvas tag X (0)
      drawPosY, // Where to place this on canvas tag Y (0)
      frameSizeX * this._scale, // How large to scale it (X)
      frameSizeY * this._scale, // How large to scale it (Y)
    );
  }
}
