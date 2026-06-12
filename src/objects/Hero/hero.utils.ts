import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import { type CollectibleItemData, type ItemKey, ITEMS_SPRITE_FRAME } from '../Item';
import { Hero } from './Hero';
import { HERO_PICKS_UP_ITEM } from './hero.constants';

export function isHeroObject(object: GameObject): object is Hero {
  return object instanceof Hero;
}

export function getHeroObject(gameObject: GameObject | null): Hero | null {
  return gameObject?.children.find((child) => isHeroObject(child)) ?? null;
}

export function emitHeroItemPickup(itemKey: ItemKey, shouldSkipPickupAnimation = false): void {
  Events.emit<CollectibleItemData>(HERO_PICKS_UP_ITEM, {
    id: itemKey,
    frame: ITEMS_SPRITE_FRAME[itemKey],
    shouldSkipPickupAnimation,
  });
}
