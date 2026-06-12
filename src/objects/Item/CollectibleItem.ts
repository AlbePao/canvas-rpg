import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import type { Vector2 } from '../../lib/Vector2';
import { HERO_PICKS_UP_ITEM, HERO_POSITION } from '../Hero';
import { Item } from './Item';
import { ITEMS_SPRITE_FRAME } from './item.constants';
import type { CollectibleItemConfig, CollectibleItemData } from './item.types';

export class CollectibleItem extends Item {
  override data: CollectibleItemData;

  constructor(config: CollectibleItemConfig) {
    super(config);

    const { itemKey, shouldSkipPickupAnimation } = config;

    const frame = ITEMS_SPRITE_FRAME[itemKey];

    this.data = {
      id: crypto.randomUUID(),
      frame,
      position: this.position,
      shouldSkipPickupAnimation: shouldSkipPickupAnimation ?? false,
    };
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (Game.detectOverlap(position, this.position)) {
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
