import { Events } from '../../lib/Events';
import { GameRegistry } from '../../lib/GameRegistry';
import type { Vector2 } from '../../lib/Vector2';
import { HERO_COLLECTS_ITEM, HERO_POSITION, isHeroOverlapping } from '../Hero';
import { Item } from './Item';
import type { CollectibleItemConfig, CollectibleItemData } from './item.types';

export class CollectibleItem extends Item {
  override data: CollectibleItemData;

  constructor(config: CollectibleItemConfig) {
    super(config);

    const { id, itemKey, skipCollectAnimation = false } = config;

    const { frame } = GameRegistry.getItem(itemKey);

    this.data = {
      id,
      itemKey,
      frame,
      position: this.position,
      skipCollectAnimation,
    };
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (isHeroOverlapping(position, this.position)) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero(): void {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we collected an item
    Events.emit<CollectibleItemData>(HERO_COLLECTS_ITEM, this.data);
  }
}
