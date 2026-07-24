import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Vector2 } from '../../lib/Vector2';
import type { ItemConfig, ItemData } from './item.types';
import { createItemSprite } from './item.utils';

export class Item extends GameObject {
  data: ItemData;

  constructor(config: ItemConfig) {
    super(config);

    const { id, itemKey } = config;
    const { frame } = GameRegistry.items.get(itemKey);

    this.data = {
      itemKey,
      frame,
      position: this.position,
    };

    const sprite = createItemSprite(`${id}-item-sprite`, frame, new Vector2(0, -20));
    this.addChild(sprite);
  }
}
