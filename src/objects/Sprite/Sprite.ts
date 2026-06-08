import { GRID_SIZE } from '../../constants/gridSize';
import type { Animations } from '../../lib/Animations';
import { GameObject } from '../../lib/GameObject';
import type { Resource } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import type { SpriteConfig } from './sprite.types';

export class Sprite extends GameObject {
  resource: Resource;
  frameSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  scale: number;
  animations: Animations | null;

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

    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(GRID_SIZE, GRID_SIZE);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.scale = scale ?? 1;
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
  private _getFrameCoordinates(frameIndex: number): { x: number; y: number } {
    const frameX = frameIndex % this.hFrames;
    const frameY = Math.floor(frameIndex / this.hFrames);
    return {
      x: frameX * this.frameSize.x,
      y: frameY * this.frameSize.y,
    };
  }

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (!this.resource.isLoaded) {
      return;
    }

    // Calculate frame coordinates without allocating Vector2
    const { x: frameCoordX, y: frameCoordY } = this._getFrameCoordinates(this.frame);

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY, // Top Y corner of frame
      frameSizeX, // How much to crop from the sprite sheet (X)
      frameSizeY, // How much to crop from the sprite sheet (Y)
      x, // Where to place this on canvas tag X (0)
      y, // Where to place this on canvas tag Y (0)
      frameSizeX * this.scale, // How large to scale it (X)
      frameSizeY * this.scale, // How large to scale it (Y)
    );
  }
}
