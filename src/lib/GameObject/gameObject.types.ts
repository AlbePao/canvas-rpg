import type { Coords2D } from '../Vector2';

export type GameObjectConfig = {
  id: string;
} & Partial<Coords2D>;

export const GAME_OBJECT_DRAW_LAYERS = ['HUD', 'WORLD_TOP', 'FLOOR'] as const;
export type GameObjectDrawLayer = (typeof GAME_OBJECT_DRAW_LAYERS)[number];
