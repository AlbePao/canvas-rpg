import { Events } from './Events';
import { Vector2 } from './Vector2';

export interface GameObjectConfig {
  id: string;
  position?: Vector2;
}

type GameObjectDrawLayer = 'HUD' | 'FLOOR' | null;

export class GameObject {
  id: string;
  position: Vector2;
  children: GameObject[] = [];
  parent: GameObject | null = null;
  hasReadyBeenCalled = false;
  isSolid = false;
  drawLayer: GameObjectDrawLayer = null;

  constructor({ id, position }: GameObjectConfig) {
    this.id = id;
    this.position = position ?? new Vector2(0, 0);
  }

  stepEntry(delta: number, root: GameObject) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call read on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented step code
    this.step(delta, root);
  }

  // Called before the first 'step'
  ready() {
    //
  }

  // Called once every frame
  step(_delta: number, _root: GameObject) {
    // ...
  }

  // Draw entry
  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    // Do the actual rendering for Images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on children
    this.getDrawChildrenOrdered().forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  getDrawChildrenOrdered() {
    return [...this.children].sort((a, b) => {
      if (b.drawLayer === 'FLOOR') {
        return 1;
      }

      return a.position.y > b.position.y ? 1 : -1;
    });
  }

  drawImage(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {
    // ...
  }

  // Remove from the tree
  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent?.removeChild(this);
  }

  // Other Game Objects are nestable inside thi one
  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    Events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => gameObject !== g);
  }
}
