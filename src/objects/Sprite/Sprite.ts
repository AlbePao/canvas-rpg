import type { Animations } from '../../lib/Animations';
import { GRID_SIZE } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import type { AssetResource } from '../../lib/GameRegistry';
import { Vector2 } from '../../lib/Vector2';
import type { SpriteConfig } from './sprite.types';

export class Sprite extends GameObject {
  private readonly _resource: AssetResource;
  private readonly _frameSize: Vector2;
  private readonly _frameOriginSize: Vector2;
  private readonly _hFrames: number;
  readonly vFrames: number;
  frame: number;
  private readonly _scale: number;
  readonly animations: Animations | null;

  constructor({
    id, // id for the sprite
    resource, // image we want to draw,
    frameSize = new Vector2(GRID_SIZE, GRID_SIZE), // size of the crop of the image
    frameOriginSize = frameSize, // size of the grid cell used to locate `frame`'s top-left corner
    hFrames = 1, // how the sprite arranged horizontally
    vFrames = 1, // how the sprite arranged vertically
    frame = 0, // which frame we want to show
    scale = 1, // how large to draw this image
    position = new Vector2(0, 0), // where to draw it (from top left corner)
    animations = null,
  }: SpriteConfig) {
    super({
      id,
    });

    this._resource = resource;
    this._frameSize = frameSize;
    this._frameOriginSize = frameOriginSize;
    this._hFrames = hFrames;
    this.vFrames = vFrames;
    this.frame = frame;
    this._scale = scale;
    this.position = position;
    this.animations = animations;
  }

  override step(delta: number): void {
    if (!this.animations) {
      return;
    }

    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  // Calculate frame X/Y origin on-the-fly without allocating an intermediate object
  private _frameOriginX(frameIndex: number): number {
    return (frameIndex % this._hFrames) * this._frameOriginSize.x;
  }

  private _frameOriginY(frameIndex: number): number {
    return Math.floor(frameIndex / this._hFrames) * this._frameOriginSize.y;
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    if (!this._resource.isLoaded) {
      return;
    }

    const x = this._frameOriginX(this.frame);
    const y = this._frameOriginY(this.frame);

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
