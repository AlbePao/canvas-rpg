import type { Vector2 } from '../../lib/Vector2';
import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import type { UUID } from '../../types/uuid';

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

type ItemsSpriteFrame = Record<ItemKey, number>;

export const ITEMS_SPRITE_FRAME: ItemsSpriteFrame = {
  hammer1: 0,
  hammer2: 1,
  slingshot1: 2,
  slingshot2: 3,
  rod1: 4,
  rod2: 5,
  potion1: 6,
  potion2: 7,
  heart: 8,
  sword: 9,
};

export interface ItemData {
  id: UUID;
  frame: number;
  position?: Vector2;
}

export type ItemConfig = GameObjectBaseConfig & {
  item: ItemKey;
};

export type CollectibleItemData = ItemData & {
  shouldSkipPickupAnimation: boolean;
};

export type CollectibleItemConfig = ItemConfig & {
  shouldSkipPickupAnimation?: boolean;
};
