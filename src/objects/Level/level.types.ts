import type { Coords2D } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';

export interface LevelConfig {
  id?: string;
  heroStartPosition?: Coords2D;
  heroFacingDirection?: Directions;
}

export type GridCoords = `${number},${number}`;
export type Walls = Set<GridCoords>;
