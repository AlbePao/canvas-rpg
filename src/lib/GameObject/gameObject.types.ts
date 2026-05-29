import type { Coords2D } from '../../types/coords';
import type { Directions } from '../../types/directions';

export type GameObjectConfig = {
  id: string;
} & Partial<
  Coords2D & {
    behaviorConfig: GameObjectBehavior[];
  }
>;

export interface GameObjectBehavior {
  type: unknown;
  direction: Directions;
}

export type GameObjectDrawLayer = 'HUD' | 'WORLD_TOP' | 'FLOOR';
