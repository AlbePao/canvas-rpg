import type { ItemStat } from '../Item';

export type InventoryCategory = '';

export type InventoryItem = ItemStat & {
  quantity: number;
};

export type InventoryItems = InventoryItem[];
