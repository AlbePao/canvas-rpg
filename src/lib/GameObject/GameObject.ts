import { Events } from '../Events';
import { toGridSize } from '../Game';
import { Vector2 } from '../Vector2';
import type { GameObjectConfig, GameObjectDrawLayer } from './gameObject.types';

export class GameObject {
  readonly id: string;
  position: Vector2;
  children: GameObject[] = [];
  parent: GameObject | null = null;
  isSolid = false;
  drawLayer: GameObjectDrawLayer | null = null;

  private _hasReadyBeenCalled = false;
  private readonly _pendingTimeouts = new Set<number>();

  // Draw-order buckets: populated by addChild/removeChild so draw() never allocates
  private _floorChildren: GameObject[] = [];
  private _defaultChildren: GameObject[] = [];

  constructor(config: GameObjectConfig) {
    const { id, x = 0, y = 0 } = config;

    this.id = id;
    this.position = new Vector2(toGridSize(x), toGridSize(y));
  }

  stepEntry(delta: number): void {
    // Call updates on all children first
    this.children.forEach((child) => {
      child.stepEntry(delta);
    });

    // Call read on the first frame
    if (!this._hasReadyBeenCalled) {
      this._hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented step code
    this.step(delta);
  }

  // Called before the first 'step'
  ready(): void {
    //
  }

  // Called once every frame
  step(_delta: number): void {
    // ...
  }

  // Draw entry
  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const drawPosX = Math.floor(x + this.position.x);
    const drawPosY = Math.floor(y + this.position.y);

    // Do the actual rendering for Images
    this.drawImage(ctx, drawPosX, drawPosY);

    // FLOOR children first (insertion order — static tiles)
    for (const child of this._floorChildren) {
      child.draw(ctx, drawPosX, drawPosY);
    }

    // Pass on children
    for (const child of this._getDrawChildrenOrdered()) {
      child.draw(ctx, drawPosX, drawPosY);
    }
  }

  private _getDrawChildrenOrdered(): GameObject[] {
    if (this._defaultChildren.length < 2) {
      return this._defaultChildren;
    }

    return [...this._defaultChildren].sort((a, b) => {
      // WORLD_TOP layer renders last (above Y-sorted objects)
      if (a.drawLayer === 'WORLD_TOP' && b.drawLayer !== 'WORLD_TOP') {
        return 1;
      }
      if (b.drawLayer === 'WORLD_TOP' && a.drawLayer !== 'WORLD_TOP') {
        return -1;
      }

      // Default: sort by Y position (top of sprite)
      return a.position.y > b.position.y ? 1 : -1;
    });
  }

  drawImage(_ctx: CanvasRenderingContext2D, _drawPosX: number, _drawPosY: number): void {
    // ...
  }

  // Remove from the tree
  destroy(): void {
    // Clear all pending timeouts
    for (const timeoutId of this._pendingTimeouts) {
      clearTimeout(timeoutId);
    }
    this._pendingTimeouts.clear();

    Events.unsubscribe(this);

    for (const child of this.children) {
      child.destroy();
    }
    this.parent?.removeChild(this);
  }

  // Other Game Objects are nestable inside this one
  addChild(gameObject: GameObject): void {
    gameObject.parent = this;
    this.children.push(gameObject);
    this._addToLayerBucket(gameObject);
  }

  removeChild(gameObject: GameObject): void {
    Events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => gameObject !== g);
    this._removeFromLayerBucket(gameObject);
  }

  private _addToLayerBucket(child: GameObject): void {
    if (child.drawLayer === 'FLOOR') {
      this._floorChildren.push(child);
    } else {
      this._defaultChildren.push(child);
    }
  }

  private _removeFromLayerBucket(child: GameObject): void {
    if (child.drawLayer === 'FLOOR') {
      this._floorChildren = this._floorChildren.filter((g) => g !== child);
    } else {
      this._defaultChildren = this._defaultChildren.filter((g) => g !== child);
    }
  }

  protected scheduleTimeout(callback: () => void, delay: number): number {
    const timeoutId = window.setTimeout(() => {
      this._pendingTimeouts.delete(timeoutId);
      callback();
    }, delay);
    this._pendingTimeouts.add(timeoutId);
    return timeoutId;
  }
}
