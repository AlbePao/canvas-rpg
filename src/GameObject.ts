import { Input } from './Input';
import { Vector2 } from './Vector2';

export type GameObjectConfig = {
  position?: Vector2;
};

export class GameObject {
  position: Vector2;
  children: GameObject[] = [];
  input?: Input;

  constructor({ position }: GameObjectConfig) {
    this.position = position ?? new Vector2(0, 0);
  }

  stepEntry(delta: number, root: GameObject) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call any implemented step code
    this.step(delta, root);
  }

  // Called once every frame
  step(delta: number, root: GameObject) {
    // ...
  }

  // Draw entry
  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    // Do the actual rendering for Images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on children
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // ...
  }

  // Other Game Objects are nestable inside thi one
  addChild(gameObject: GameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    this.children = this.children.filter((g) => gameObject !== g);
  }
}
