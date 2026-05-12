import type { TextContentConfig } from '../../lib/StoryFlags/storyFlags.types';
import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import type { ItemKey } from '../Item';

export type ChestStatus = 'OPEN' | 'CLOSED';

export type ChestConfig = GameObjectBaseConfig & {
  status?: ChestStatus;
  textConfig?: TextContentConfig[]; // requires and bypass properties are useful for when a chest needs a key and/or hero already has it
  lootConfig: LootConfig;
};

export interface LootConfig {
  // Expand this in the future to support random loot of item or multiple items
  item: ItemKey;
}
