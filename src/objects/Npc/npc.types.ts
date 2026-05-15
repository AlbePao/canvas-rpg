import type { NpcKey } from '../../lib/Resources';
import type { InteractiveObjectConfig } from '../InteractiveObject';

export type NpcConfig = InteractiveObjectConfig & {
  npc: NpcKey;
};
