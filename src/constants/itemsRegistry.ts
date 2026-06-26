import type { ItemKey } from '../objects/Item';

export interface ItemStat {
  itemKey: ItemKey;
  name: string;
  type: 'equipable' | 'consumable';
}

export const ITEMS_REGISTRY: Record<ItemKey, ItemStat> = {
  hammer1: {
    itemKey: 'hammer1',
    name: 'Hammer 1',
    type: 'equipable',
  },
  hammer2: {
    itemKey: 'hammer2',
    name: 'Hammer 2',
    type: 'equipable',
  },
  heart: {
    itemKey: 'heart',
    name: 'Heart',
    type: 'consumable',
  },
  potion1: {
    itemKey: 'potion1',
    name: 'Potion 1',
    type: 'consumable',
  },
  potion2: {
    itemKey: 'potion2',
    name: 'Potion 2',
    type: 'consumable',
  },
  rod1: {
    itemKey: 'rod1',
    name: 'Rod 1',
    type: 'equipable',
  },
  rod2: {
    itemKey: 'rod2',
    name: 'Rod 2',
    type: 'equipable',
  },
  slingshot1: {
    itemKey: 'slingshot1',
    name: 'Slingshot 1',
    type: 'equipable',
  },
  slingshot2: {
    itemKey: 'slingshot2',
    name: 'Slingshot 2',
    type: 'equipable',
  },
  sword: {
    itemKey: 'sword',
    name: 'Sword',
    type: 'equipable',
  },
};
