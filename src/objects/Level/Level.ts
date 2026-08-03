import { GameObject } from '../../lib/GameObject';
import type { Coords2D } from '../../lib/Vector2';
import { Hero } from '../Hero';
import type { Sprite } from '../Sprite';
import type { GridCoords, LevelConfig, Walls } from './level.types';

// This class can be used to create a new level or to instance a new level from a config passed to LevelBuilder
export class Level extends GameObject {
  private readonly _spatialGrid = new Map<GridCoords, Set<GameObject>>();
  hero: Hero | null = null;
  heroStartPosition?: Coords2D;
  background: Sprite | null = null;
  readonly walls: Walls = new Set<GridCoords>();

  constructor(config: LevelConfig) {
    const { id } = config;

    super({
      id,
    });
  }

  override addChild(gameObject: GameObject): void {
    super.addChild(gameObject);
    this.registerPosition(gameObject.position.x, gameObject.position.y, gameObject);

    if (gameObject instanceof Hero) {
      this.hero = gameObject;
    }
  }

  override removeChild(gameObject: GameObject): void {
    super.removeChild(gameObject);
    this.unregisterPosition(gameObject.position.x, gameObject.position.y, gameObject);
  }

  registerPosition(x: number, y: number, gameObject: GameObject): void {
    const key: GridCoords = `${x},${y}`;
    if (!this._spatialGrid.has(key)) {
      this._spatialGrid.set(key, new Set());
    }
    this._spatialGrid.get(key)!.add(gameObject);
  }

  unregisterPosition(x: number, y: number, gameObject: GameObject): void {
    const key: GridCoords = `${x},${y}`;
    const cell = this._spatialGrid.get(key);
    if (cell) {
      cell.delete(gameObject);

      if (cell.size === 0) {
        this._spatialGrid.delete(key);
      }
    }
  }

  updateObjectPosition(oldX: number, oldY: number, newX: number, newY: number, gameObject: GameObject): void {
    this.unregisterPosition(oldX, oldY, gameObject);
    this.registerPosition(newX, newY, gameObject);
  }

  getFirstObjectAt(x: number, y: number): GameObject | null {
    const key: GridCoords = `${x},${y}`;
    const cell = this._spatialGrid.get(key);

    if (!cell) {
      return null;
    }

    for (const gameObject of cell) {
      return gameObject;
    }

    return null;
  }

  hasSolidObjectAt(x: number, y: number): boolean {
    const key: GridCoords = `${x},${y}`;
    const cell = this._spatialGrid.get(key);

    if (!cell) {
      return false;
    }

    for (const gameObject of cell) {
      if (gameObject.isSolid) {
        return true;
      }
    }

    return false;
  }
}
