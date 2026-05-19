import type { NpcBehavior } from '../objects/Npc';

export interface GameObjectBaseConfig {
  id: string;
  x: number;
  y: number;
  behaviorConfig?: NpcBehavior[];
}
