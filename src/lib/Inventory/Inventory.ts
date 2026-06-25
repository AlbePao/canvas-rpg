import { ITEMS_REGISTRY } from '../../constants/itemsRegistry';
import type { ItemKey } from '../../objects/Item';
import { Singleton } from '../Singleton';
import type { InventoryItem } from './inventory.types';

class InventorySingleton extends Singleton<InventorySingleton>() {
  private readonly _itemsMap = new Map<ItemKey, InventoryItem>();

  add(itemKey: ItemKey): void {
    const existing = this._itemsMap.get(itemKey);

    if (existing) {
      existing.quantity += 1;
    } else {
      this._itemsMap.set(itemKey, {
        ...ITEMS_REGISTRY[itemKey],
        quantity: 1,
      });
    }
  }

  getAll(): InventoryItem[] {
    return [...this._itemsMap.values()];
  }

  get(itemKey: ItemKey): InventoryItem | null {
    return this._itemsMap.get(itemKey) ?? null;
  }
}

export const Inventory = InventorySingleton.getInstance();
