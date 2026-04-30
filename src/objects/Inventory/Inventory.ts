import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { UUID } from '../../types/uuid';
import { Vector2 } from '../../Vector2';
import { CollectibleItemData, createCollectibleItemSprite } from '../CollectibleItem/CollectibleItem';

export type GameItem = Omit<CollectibleItemData, 'position' | 'shouldSkipPickupAnimation'>;

export class Inventory extends GameObject {
  nextId = 0;
  items: GameItem[] = [
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
      position: new Vector2(0, 1),
    });

    this.drawLayer = 'HUD';

    // React to hero picking up an item
    events.on<CollectibleItemData>('HERO_PICKS_UP_ITEM', this, ({ id, frame }) => {
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

  renderInventory() {
    // Remove stale drawings
    this.children.forEach((child) => child.destroy());

    // Draw fresh from the latest version of the list
    this.items.forEach((item, index) => {
      const sprite = createCollectibleItemSprite(item.frame, new Vector2(index * 16, -8));
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: UUID) {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}
