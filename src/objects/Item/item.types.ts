import type { GameObjectConfig } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';

export const ITEM_KEYS = [
  'hammer1',
  'hammer2',
  'slingshot1',
  'slingshot2',
  'rod1',
  'rod2',
  'potion1',
  'potion2',
  'heart',
  'sword',
] as const;
// TODO: remove ItemKey type and use generic string type. The items keys are validated a startup time by zod
export type ItemKey = (typeof ITEM_KEYS)[number];

export type ItemConfig = GameObjectConfig & {
  itemKey: ItemKey;
};

export type CollectibleItemConfig = ItemConfig & {
  skipCollectAnimation?: boolean;
};

export interface ItemData {
  itemKey: ItemKey;
  frame: number;
  position?: Vector2;
}

export type CollectibleItemData = ItemData & {
  id: string;
  skipCollectAnimation: boolean;
};
