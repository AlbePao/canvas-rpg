import type { GameObjectConfig } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';

export type ItemConfig = GameObjectConfig & {
  itemKey: string;
};

export type CollectibleItemConfig = ItemConfig & {
  skipCollectAnimation?: boolean;
};

export interface ItemData {
  itemKey: string;
  frame: number;
  position?: Vector2;
}

export type CollectibleItemData = ItemData & {
  id: string;
  skipCollectAnimation: boolean;
};
