import type { ItemKey } from '../objects/Item';

export interface ItemStat {
  itemKey: ItemKey;
  type: 'equipable' | 'consumable';
}

export const ITEMS_REGISTRY: Record<ItemKey, ItemStat> = {
  hammer1: {
    itemKey: 'hammer1',
    type: 'equipable',
  },
  hammer2: {
    itemKey: 'hammer2',
    type: 'equipable',
  },
  heart: {
    itemKey: 'heart',
    type: 'consumable',
  },
  potion1: {
    itemKey: 'potion1',
    type: 'consumable',
  },
  potion2: {
    itemKey: 'potion2',
    type: 'consumable',
  },
  rod1: {
    itemKey: 'rod1',
    type: 'equipable',
  },
  rod2: {
    itemKey: 'rod2',
    type: 'equipable',
  },
  slingshot1: {
    itemKey: 'slingshot1',
    type: 'equipable',
  },
  slingshot2: {
    itemKey: 'slingshot2',
    type: 'equipable',
  },
  sword: {
    itemKey: 'sword',
    type: 'equipable',
  },
};
