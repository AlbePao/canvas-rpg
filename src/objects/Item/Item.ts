import { GameObject } from '../../lib/GameObject';
import { Vector2 } from '../../lib/Vector2';
import { ITEMS_SPRITE_FRAME } from './item.constants';
import type { ItemConfig, ItemData } from './item.types';
import { createItemSprite } from './item.utils';

export class Item extends GameObject {
  data: ItemData;

  constructor(config: ItemConfig) {
    super(config);

    const { id, itemKey } = config;
    const frame = ITEMS_SPRITE_FRAME[itemKey];

    this.data = {
      id: crypto.randomUUID(),
      frame,
      position: this.position,
    };

    const sprite = createItemSprite(`${id}-item-sprite`, frame, new Vector2(0, -20));
    this.addChild(sprite);
  }
}
