import type { GameObjectConfig } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';

export type ItemKey =
  | 'hammer1'
  | 'hammer2'
  | 'slingshot1'
  | 'slingshot2'
  | 'rod1'
  | 'rod2'
  | 'potion1'
  | 'potion2'
  | 'heart'
  | 'sword';

export type ItemConfig = GameObjectConfig & {
  itemKey: ItemKey;
};

export type CollectibleItemConfig = ItemConfig & {
  shouldSkipPickupAnimation?: boolean;
};

export interface ItemData {
  itemKey: ItemKey;
  frame: number;
  position?: Vector2;
}

export type CollectibleItemData = ItemData & {
  shouldSkipPickupAnimation: boolean;
};
