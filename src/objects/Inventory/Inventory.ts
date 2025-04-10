import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { Resource, resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { ItemData } from '../Rod/Rod';

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type GameItem = {
  id: UUID;
  image: Resource;
};

export class Inventory extends GameObject {
  nextId = 0;
  items: GameItem[] = [
    {
      id: crypto.randomUUID(),
      image: resources.images.rod,
    },
    {
      id: crypto.randomUUID(),
      image: resources.images.rod,
    },
  ];

  constructor() {
    super({
      position: new Vector2(0, 1),
    });

    this.drawLayer = 'HUD';

    // React to hero picking up an item
    events.on<ItemData>('HERO_PICKS_UP_ITEM', this, (data) => {
      this.items.push({
        id: crypto.randomUUID(),
        image: data.image,
      });
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
      const sprite = new Sprite({
        position: new Vector2(index * 12, 0),
        resource: item.image,
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: UUID) {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}
