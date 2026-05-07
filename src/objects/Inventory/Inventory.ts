import { HERO_PICKS_UP_ITEM } from '../../constants/events';
import { Events } from '../../Events';
import { GameObject } from '../../GameObject';
import { createItemSprite } from '../../helpers/createItemSprite';
import { UUID } from '../../types/uuid';
import { Vector2 } from '../../Vector2';
import { CollectibleItemData } from '../Item';
import { InventoryItem } from './inventory.types';

export class Inventory extends GameObject {
  nextId = 0;
  items: InventoryItem[] = [
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
      position: new Vector2(0, 1),
    });

    this.drawLayer = 'HUD';

    // React to hero picking up an item
    Events.on<CollectibleItemData>(HERO_PICKS_UP_ITEM, this, ({ id, frame }) => {
      this.items.push({ id, frame });
      this.renderInventory();
    });

    // Demo removing of something (could happen on item use)
    // setTimeout(() => {
    //   this.removeFromInventory(-2);
    // }, 2000);

    // Draw initial state on boot up
    this.renderInventory();
  }

  renderInventory(): void {
    // Remove stale drawings
    this.children.forEach((child) => child.destroy());

    // Draw fresh from the latest version of the list
    this.items.forEach((item, index) => {
      const sprite = createItemSprite({
        id: `${item.id}-inventory-sprite`,
        frame: item.frame,
        position: new Vector2(index * 16, -8),
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: UUID): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}
