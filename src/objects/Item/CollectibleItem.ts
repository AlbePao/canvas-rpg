import { HERO_PICKS_UP_ITEM, HERO_POSITION } from '../../constants/events';
import { detectOverlap } from '../../helpers/detectOverlap';
import { Events } from '../../lib/Events';
import { Vector2 } from '../../lib/Vector2';
import { Item } from './Item';
import { CollectibleItemConfig, CollectibleItemData, ITEMS_SPRITE_FRAME } from './item.types';

export class CollectibleItem extends Item {
  override data: CollectibleItemData;

  constructor({ id, item, x, y, shouldSkipPickupAnimation }: CollectibleItemConfig) {
    super({ id, item, x, y });

    const frame = ITEMS_SPRITE_FRAME[item];

    this.data = {
      id: crypto.randomUUID(),
      frame,
      position: this.position,
      shouldSkipPickupAnimation: shouldSkipPickupAnimation ?? false,
    };
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero(): void {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picker up a collectible item
    Events.emit<CollectibleItemData>(HERO_PICKS_UP_ITEM, this.data);
  }
}
