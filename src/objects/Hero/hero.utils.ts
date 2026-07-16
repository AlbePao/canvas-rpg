import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';
import { type CollectibleItemData, type ItemKey, ITEMS_FRAME_MAP } from '../Item';
import { Hero } from './Hero';
import { HERO_COLLECTS_ITEM } from './hero.constants';

export function isHeroOverlapping(heroPosition: Vector2, objectPosition: Vector2): boolean {
  // detect overlap
  const roundedHeroX = Math.round(heroPosition.x);
  const roundedHeroY = Math.round(heroPosition.y);

  return roundedHeroX === objectPosition.x && roundedHeroY === objectPosition.y;
}

export function getHeroObject(gameObject: GameObject | null): Hero | null {
  return gameObject?.children.find((child) => child instanceof Hero) ?? null;
}

export function emitHeroItemCollect(itemKey: ItemKey, skipCollectAnimation = false): void {
  // This function is used to trigger collect animation if hero collects item from a chest or an npc
  Events.emit<CollectibleItemData>(HERO_COLLECTS_ITEM, {
    // Placeholder id since this function is used only to trigger animation
    id: `collected-${itemKey}`,
    itemKey,
    frame: ITEMS_FRAME_MAP[itemKey],
    skipCollectAnimation,
  });
}
