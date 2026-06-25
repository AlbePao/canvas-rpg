import type { ItemStat } from '../../constants/itemsRegistry';

export type InventoryCategory = '';

export type InventoryItem = ItemStat & {
  quantity: number;
};

export type InventoryItems = InventoryItem[];
