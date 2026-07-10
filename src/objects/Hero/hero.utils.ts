import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import { type CollectibleItemData, type ItemKey, ITEMS_SPRITE_FRAME } from '../Item';
import { Hero } from './Hero';
import { HERO_COLLECTS_ITEM } from './hero.constants';

export function isHeroObject(object: GameObject): object is Hero {
  return object instanceof Hero;
}

export function getHeroObject(gameObject: GameObject | null): Hero | null {
  return gameObject?.children.find((child) => isHeroObject(child)) ?? null;
}

export function emitHeroItemCollect(itemKey: ItemKey, skipCollectAnimation = false): void {
  // This function is used to trigger collect animation if hero collects item from a chest or an npc
  Events.emit<CollectibleItemData>(HERO_COLLECTS_ITEM, {
    // Placeholder id since this function is used only to trigger animation
    id: `collected-${itemKey}`,
    itemKey,
    frame: ITEMS_SPRITE_FRAME[itemKey],
    skipCollectAnimation,
  });
}
