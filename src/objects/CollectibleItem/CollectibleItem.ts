import { events } from '../../Events';
import { Vector2 } from '../../Vector2';
import { createItemSprite, Item, ItemConfig, ItemData, ITEMS_SPRITE_FRAME } from '../Item/Item';

export type CollectibleItemData = ItemData & {
  shouldSkipPickupAnimation: boolean;
};

export type CollectibleItemConfig = ItemConfig & {
  shouldSkipPickupAnimation?: boolean;
};

export class CollectibleItem extends Item {
  data: CollectibleItemData;

  constructor(config: CollectibleItemConfig) {
    const { item, x, y, shouldSkipPickupAnimation } = config;

    super({ item, x, y });
    const frame = ITEMS_SPRITE_FRAME[item];

    this.data = {
      id: crypto.randomUUID(),
      frame,
      position: this.position,
      shouldSkipPickupAnimation: shouldSkipPickupAnimation ?? false,
    };

    const sprite = createItemSprite(frame, new Vector2(0, -20));
    this.addChild(sprite);
  }

  ready() {
    events.on<Vector2>('HERO_POSITION', this, (position) => {
      // detect overlap
      const roundedHeroX = Math.round(position.x);
      const roundedHeroY = Math.round(position.y);

      if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picker up a collectible item
    events.emit<CollectibleItemData>('HERO_PICKS_UP_ITEM', this.data);
  }
}
