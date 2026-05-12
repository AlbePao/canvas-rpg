import type { Vector2 } from '../Vector2';

export interface GameObjectConfig {
  id: string;
  position?: Vector2;
}

export type GameObjectDrawLayer = 'HUD' | 'WORLD_TOP' | 'FLOOR';
