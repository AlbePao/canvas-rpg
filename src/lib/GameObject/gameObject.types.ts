import type { NpcBehavior } from '../../objects/Npc';
import type { Vector2 } from '../Vector2';

// TODO: replace position property with x and y
export interface GameObjectConfig {
  id: string;
  position?: Vector2;
  behaviorConfig?: NpcBehavior[];
}

export type GameObjectDrawLayer = 'HUD' | 'WORLD_TOP' | 'FLOOR';
