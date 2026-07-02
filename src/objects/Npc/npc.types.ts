import type { NpcKey } from '../../lib/Resources';
import type { InteractiveObjectConfig } from '../InteractiveObject';
import type { MovableObjectBehavior } from '../MovableObject';

export type NpcConfig = InteractiveObjectConfig & {
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
