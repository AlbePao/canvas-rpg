import type { GameObjectBehavior } from '../../lib/GameObject';
import type { NpcKey } from '../../lib/Resources';
import type { InteractiveObjectConfig } from '../InteractiveObject';

export type NpcConfig = InteractiveObjectConfig & {
  npc: NpcKey;
  behaviorConfig?: NpcBehavior[];
};

export type NpcBehavior = GameObjectBehavior &
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
