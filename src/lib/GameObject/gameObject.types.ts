import type { Vector2 } from '../Vector2';

export interface GameObjectConfig {
  id: string;
  position?: Vector2;
}

export const GAME_OBJECT_DRAW_LAYERS = ['HUD', 'WORLD_TOP', 'FLOOR'] as const;

export type GameObjectDrawLayer = (typeof GAME_OBJECT_DRAW_LAYERS)[number] | null;
