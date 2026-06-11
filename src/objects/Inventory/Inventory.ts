import { HERO_PICKS_UP_ITEM } from '../../constants/events';
import { createItemSprite } from '../../helpers/createItemSprite';
import { gridCells } from '../../helpers/grid';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Vector2 } from '../../lib/Vector2';
import type { UUID } from '../../types/uuid';
import type { CollectibleItemData } from '../Item';
import type { InventoryItem } from './inventory.types';

export class Inventory extends GameObject {
  private readonly _items: InventoryItem[] = [
    {
      id: crypto.randomUUID(),
      frame: 4,
    },
    {
      id: crypto.randomUUID(),
      frame: 1,
    },
  ];

  constructor() {
    super({
      id: 'inventory',
    });

    this.drawLayer = 'HUD';

    // React to hero picking up an item
    Events.on<CollectibleItemData>(HERO_PICKS_UP_ITEM, this, ({ id, frame }) => {
      this._items.push({ id, frame });
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
    this._items.forEach((item, index) => {
      const sprite = createItemSprite({
        id: `${item.id}-inventory-sprite`,
        frame: item.frame,
        position: new Vector2(gridCells(index), -8),
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: UUID): void {
    const indexToRemove = this._items.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
      this._items.splice(indexToRemove, 1);
      this._rebuildInventoryDisplay();
    }
  }
}
