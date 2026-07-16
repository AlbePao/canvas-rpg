import type { Coords2D } from '../../lib/Vector2';

export interface LevelConfig {
  id?: string;
  heroStartPosition?: Coords2D;
}

export type GridCoords = `${number},${number}`;
export type Walls = Set<GridCoords>;
