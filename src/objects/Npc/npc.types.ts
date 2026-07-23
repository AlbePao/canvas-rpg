import type { Directions } from '../../types/directions';
import type { MovableObjectBehavior, MovableObjectConfig } from '../MovableObject';

export type NpcConfig = MovableObjectConfig & {
  npc: string;
  facingDirection?: Directions;
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
