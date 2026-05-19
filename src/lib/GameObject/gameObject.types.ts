import type { NpcBehavior } from '../../objects/Npc';
import type { Coords2D } from '../../types/coords';

export type GameObjectConfig = {
  id: string;
} & Partial<Coords2D> & {
    behaviorConfig?: NpcBehavior[];
  };

export type GameObjectDrawLayer = 'HUD' | 'WORLD_TOP' | 'FLOOR';
