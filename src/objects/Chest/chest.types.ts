import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import { ItemKey } from '../Item';

export type ChestStatus = 'OPEN' | 'CLOSED';

export type ChestConfig = GameObjectBaseConfig & {
  status?: ChestStatus;
  lootConfig: LootConfig;
};

export interface LootConfig {
  // Expand this in the future to support random loot of item or multiple items
  item: ItemKey;
}
