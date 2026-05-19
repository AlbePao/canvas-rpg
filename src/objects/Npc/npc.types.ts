import type { NpcKey } from '../../lib/Resources';
import type { Directions } from '../../types/directions';
import type { InteractiveObjectConfig } from '../InteractiveObject';

export type NpcConfig = InteractiveObjectConfig & {
  npc: NpcKey;
  behaviorConfig?: NpcBehavior[];
};

export type NpcBehavior = (
  | {
      type: 'stand';
      duration?: number;
    }
  | {
      type: 'walk';
    }
) & {
  direction: Directions;
};
