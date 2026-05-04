import { GameObject } from '../../GameObject';
import { createItemSprite } from '../../helpers/createItemSprite';
import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import { UUID } from '../../types/uuid';
import { Vector2 } from '../../Vector2';

export type ItemKey =
  | 'hammer1'
  | 'hammer2'
  | 'slingshot1'
  | 'slingshot2'
  | 'rod1'
  | 'rod2'
  | 'potion1'
  | 'potion2'
  | 'heart'
  | 'sword';

type ItemsSpriteFrame = Record<ItemKey, number>;

export const ITEMS_SPRITE_FRAME: ItemsSpriteFrame = {
  hammer1: 0,
  hammer2: 1,
  slingshot1: 2,
  slingshot2: 3,
  rod1: 4,
  rod2: 5,
  potion1: 6,
  potion2: 7,
  heart: 8,
  sword: 9,
};

export interface ItemData {
  id: UUID;
  frame: number;
  position?: Vector2;
}

export type ItemConfig = GameObjectBaseConfig & {
  item: ItemKey;
};

export class Item extends GameObject {
  data: ItemData;

  constructor({ id, item, x, y }: ItemConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });
    const frame = ITEMS_SPRITE_FRAME[item];

    this.data = {
      id: crypto.randomUUID(),
      frame,
      position: this.position,
    };

    const sprite = createItemSprite({
      id: `${id}-item-sprite`,
      frame,
      position: new Vector2(0, -20),
    });
    this.addChild(sprite);
  }
}
