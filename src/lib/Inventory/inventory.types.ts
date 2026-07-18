import type { ItemData } from '../GameRegistry';

export type InventoryCategory = '';

export type InventoryItem = ItemData & {
  quantity: number;
};

export type InventoryItems = InventoryItem[];
