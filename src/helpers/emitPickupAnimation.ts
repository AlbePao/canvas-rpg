import { HERO_PICKS_UP_ITEM } from '../constants/events';
import { Events } from '../lib/Events';
import type { CollectibleItemData, ItemKey } from '../objects/Item';
import { ITEMS_SPRITE_FRAME } from '../objects/Item/item.constants';

export function emitPickupAnimation(itemKey: ItemKey, shouldSkipPickupAnimation = false): void {
  Events.emit<CollectibleItemData>(HERO_PICKS_UP_ITEM, {
    id: crypto.randomUUID(),
    frame: ITEMS_SPRITE_FRAME[itemKey],
    shouldSkipPickupAnimation,
  });
}
