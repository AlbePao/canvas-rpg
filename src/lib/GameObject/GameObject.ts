import { BEHAVIOR_END } from '../../constants/events';
import { gridCells } from '../../helpers/grid';
import type { Main } from '../../objects/Main';
import { Events } from '../Events';
import { Vector2 } from '../Vector2';
import type { GameObjectBehavior, GameObjectConfig, GameObjectDrawLayer } from './gameObject.types';

export class GameObject {
  id: string;
  position: Vector2;
  children: GameObject[] = [];
  parent: GameObject | null = null;
  isSolid = false;
  drawLayer: GameObjectDrawLayer | null = null;

  behaviorConfig: GameObjectBehavior[];

  private _hasReadyBeenCalled = false;
  protected behaviorIndex = 0;
  private _retryTimeout: number | null = null;
  private readonly _pendingTimeouts = new Set<number>();

  constructor(config: GameObjectConfig) {
    const { id, x, y, behaviorConfig } = config;
    this.id = id;
    this.position = new Vector2(gridCells(x ?? 0), gridCells(y ?? 0));
    // Set object behavior loop
    this.behaviorConfig = behaviorConfig ?? [];
  }

  stepEntry(delta: number, root: Main): void {
    // Call updates on all children first
    this.children.forEach((child) => {
      child.stepEntry(delta, root);
    });

    // Call read on the first frame
    if (!this._hasReadyBeenCalled) {
      this._hasReadyBeenCalled = true;
      this.ready();
      // Set and start behavior loop
      this.setBehaviorLoop(root);
    }

    // Call any implemented step code
    this.step(delta, root);
  }

  // Called before the first 'step'
  ready(): void {
    //
  }

  // Called once every frame
  step(_delta: number, _root: Main): void {
    // ...
  }

  // Draw entry
  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const drawPosX = Math.floor(x + this.position.x);
    const drawPosY = Math.floor(y + this.position.y);

    // Do the actual rendering for Images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on children
    this.getDrawChildrenOrdered().forEach((child) => {
      child.draw(ctx, drawPosX, drawPosY);
    });
  }

  getDrawChildrenOrdered(): GameObject[] {
    return [...this.children].sort((a, b) => {
      // FLOOR layer renders first (below everything)
      if (b.drawLayer === 'FLOOR') {
        return 1;
      }

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

  drawImage(_ctx: CanvasRenderingContext2D, _x: number, _y: number): void {
    // ...
  }

  // Remove from the tree
  destroy(): void {
    // Clear all pending timeouts
    this._pendingTimeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this._pendingTimeouts.clear();

    if (this._retryTimeout) {
      clearTimeout(this._retryTimeout);
      this._retryTimeout = null;
    }

    Events.unsubscribe(this);

    this.children.forEach((child) => {
      child.destroy();
    });
    this.parent?.removeChild(this);
  }

  // Other Game Objects are nestable inside this one
  addChild(gameObject: GameObject): void {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject): void {
    Events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => gameObject !== g);
  }

  protected scheduleTimeout(callback: () => void, delay: number): number {
    const timeoutId = window.setTimeout(() => {
      this._pendingTimeouts.delete(timeoutId);
      callback();
    }, delay);
    this._pendingTimeouts.add(timeoutId);
    return timeoutId;
  }

  setBehaviorLoop(root: Main): void {
    if (this.behaviorConfig.length === 0) {
      return;
    }

    // If we have a behavior, kick off after a short delay - track this timeout
    this.scheduleTimeout(() => {
      this.doBehaviorEvent(root);
    }, 10);

    Events.on<string>(BEHAVIOR_END, this, (id) => {
      if (id !== this.id) {
        return;
      }

      // Setting the next event to fire
      this.behaviorIndex += 1;

      if (this.behaviorIndex === this.behaviorConfig.length) {
        this.behaviorIndex = 0;
      }

      // Do it again!
      this.doBehaviorEvent(root);
    });
  }

  doBehaviorEvent(root: Main): void {
    const { isCutscenePlaying } = root;
    if (isCutscenePlaying || this.behaviorConfig.length === 0) {
      return;
    }

    if (isCutscenePlaying) {
      if (this._retryTimeout) {
        clearTimeout(this._retryTimeout);
      }

      this._retryTimeout = this.scheduleTimeout(() => {
        this.doBehaviorEvent(root);
      }, 1000);

      return;
    }

    this.startBehavior(this.behaviorConfig[this.behaviorIndex]);
  }

  startBehavior(_behavior: GameObjectBehavior): void {
    // ...
  }
}
