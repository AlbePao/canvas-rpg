import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Vector2 } from '../../lib/Vector2';
import type { ItemConfig } from './item.types';
import { createItemSprite } from './item.utils';

export class Item extends GameObject {
  constructor(config: ItemConfig) {
    super(config);

    const { id, itemKey } = config;
    const { frame } = GameRegistry.items.get(itemKey);

    const sprite = createItemSprite(`${id}-item-sprite`, frame, new Vector2(0, -20));
    this.addChild(sprite);
  }
}
