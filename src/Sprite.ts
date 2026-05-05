import { Animations } from './Animations';
import { GRID_SIZE } from './constants/gridSize';
import { GameObject } from './GameObject';
import { Resource } from './Resources';
import { Vector2 } from './Vector2';

export type SpriteConfig = {
  id: string;
  resource: Resource;
} & Partial<{
  frameSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  scale: number;
  position: Vector2;
  animations: Animations<string | number | symbol>;
}>;

export class Sprite extends GameObject {
  resource: Resource;
  frameSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  frameMap = new Map();
  scale: number;
  position: Vector2;
  animations: Animations<string | number | symbol> | null;

  constructor({
    id, // id for the sprite
    resource, // image we want to draw,
    frameSize, // size of the crop of the image
    hFrames, // how the sprite arranged horizontally
    vFrames, // how the sprite arranged vertically
    frame, // which frame we want to show
    scale, // how large to draw this image
    position, // where to draw it (top left corner)
    animations,
  }: SpriteConfig) {
    super({ id });
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(GRID_SIZE, GRID_SIZE);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.animations = animations ?? null;
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(frameCount, new Vector2(this.frameSize.x * h, this.frameSize.y * v));
        frameCount++;
      }
    }
  }

  step(delta: number) {
    if (!this.animations) {
      return;
    }

    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.isLoaded) {
      return;
    }

    // Find the current sprite sheet frame to use
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

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
