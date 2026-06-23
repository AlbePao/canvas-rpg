import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Vector2 } from '../../lib/Vector2';
import { HERO_PICKS_UP_ITEM } from '../Hero';
import type { CollectibleItemData, ItemKey } from '../Item';
import { createItemSprite } from '../Item';
import type { InventoryItem } from './inventory.types';

export class Inventory extends GameObject {
  private readonly _items: InventoryItem[] = [
    {
      itemKey: 'hammer1',
      frame: 4,
    },
    {
      itemKey: 'hammer2',
      frame: 1,
    },
  ];

  constructor() {
    super({
      id: 'inventory',
    });

    this.drawLayer = 'HUD';

    // React to hero picking up an item
    Events.on<CollectibleItemData>(HERO_PICKS_UP_ITEM, this, ({ itemKey, frame }) => {
      this._items.push({ itemKey, frame });
      this._rebuildInventoryDisplay();
    });

    // Build initial display once
    this._rebuildInventoryDisplay();
  }

  // Only rebuild when items actually change (not every render frame)
  private _rebuildInventoryDisplay(): void {
    // Clear all old children
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children = [];

    // Create fresh sprites for current items
    this._items.forEach(({ itemKey, frame }, index) => {
      const sprite = createItemSprite(`${itemKey}-inventory-sprite`, frame, new Vector2(Game.toGridSize(index), -8));
      this.addChild(sprite);
    });
  }

  removeFromInventory(itemKey: ItemKey): void {
    const indexToRemove = this._items.findIndex((item) => item.itemKey === itemKey);
    if (indexToRemove !== -1) {
      this._items.splice(indexToRemove, 1);
      this._rebuildInventoryDisplay();
    }
  }
}
