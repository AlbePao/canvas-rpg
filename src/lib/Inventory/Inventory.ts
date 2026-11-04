import { GameRegistry } from '../GameRegistry';
import { Singleton } from '../Singleton';
import type { InventoryItem } from './inventory.types';

class InventorySingleton extends Singleton<InventorySingleton>() {
  private readonly _itemsMap = new Map<string, InventoryItem>();

  add(itemKey: string, quantity = 1): void {
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      throw new RangeError(`Inventory: quantity must be a positive safe integer, received ${quantity}`);
    }

    const existing = this._itemsMap.get(itemKey);

    if (existing) {
      if (!Number.isSafeInteger(existing.quantity + quantity)) {
        throw new RangeError(`Inventory: quantity for "${itemKey}" exceeds the safe integer range`);
      }

      existing.quantity += quantity;
    } else {
      this._itemsMap.set(itemKey, {
        ...GameRegistry.items.get(itemKey),
        quantity,
      });
    }
  }

  remove(itemKey: string | null): void {
    if (!itemKey) {
      return;
    }

    const existing = this._itemsMap.get(itemKey);

    if (existing) {
      existing.quantity -= 1;
      if (existing.quantity < 1) {
        this._itemsMap.delete(itemKey);
      }
    }
  }

  getAll(): InventoryItem[] {
    return [...this._itemsMap.values()].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  get(itemKey: string): InventoryItem | null {
    return this._itemsMap.get(itemKey) ?? null;
  }
}

export const Inventory = InventorySingleton.getInstance();
