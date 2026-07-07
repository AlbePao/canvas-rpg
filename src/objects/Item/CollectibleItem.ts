import { Events } from '../../lib/Events';
import { detectOverlap } from '../../lib/Game';
import type { Vector2 } from '../../lib/Vector2';
import { HERO_COLLECTS_ITEM, HERO_POSITION } from '../Hero';
import { Item } from './Item';
import { ITEMS_SPRITE_FRAME } from './item.constants';
import type { CollectibleItemConfig, CollectibleItemData } from './item.types';

export class CollectibleItem extends Item {
  override data: CollectibleItemData;

  constructor(config: CollectibleItemConfig) {
    super(config);

    const { id, itemKey, skipCollectAnimation = false } = config;

    const frame = ITEMS_SPRITE_FRAME[itemKey];

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
      if (detectOverlap(position, this.position)) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero(): void {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picker up a collectible item
    Events.emit<CollectibleItemData>(HERO_COLLECTS_ITEM, this.data);
  }
}
