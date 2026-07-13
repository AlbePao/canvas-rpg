import type { NpcKey } from '../../lib/Resources';
import type { MovableObjectBehavior, MovableObjectConfig } from '../MovableObject';

export type NpcConfig = MovableObjectConfig & {
  npc: NpcKey;
  behaviorConfig?: NpcBehavior[];
};

export type NpcBehavior = MovableObjectBehavior &
  (
    | {
        type: 'stand';
        duration?: number;
      }
    | {
        type: 'walk';
        speed?: number; // Optional walking speed multiplier
      }
  );
