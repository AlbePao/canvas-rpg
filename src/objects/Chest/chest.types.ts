import type { InteractiveObjectConfig } from '../InteractiveObject';
import type { ItemKey } from '../Item';

export type ChestStatus = 'OPEN' | 'CLOSED';

export type ChestConfig = InteractiveObjectConfig & {
  status?: ChestStatus;
};

export interface LootConfig {
  // Expand this in the future to support random loot of item or multiple items
  item: ItemKey;
}
