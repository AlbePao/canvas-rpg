import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { UUID } from '../../types/uuid';
import { Vector2 } from '../../Vector2';

export type Item =
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

type ItemsSpriteFrame = Record<Item, number>;

const ITEMS_SPRITE_FRAME: ItemsSpriteFrame = {
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

export type CollectibleItemData = {
  id: UUID;
  frame: number;
  position: Vector2;
  shouldSkipPickupAnimation: boolean;
};

export interface CollectibleItemConfig {
  item: Item;
  x: number;
  y: number;
  shouldSkipPickupAnimation?: boolean;
}

export function createCollectibleItemSprite(frame: number, position: Vector2) {
  return new Sprite({
    resource: resources.images.items,
    frameSize: new Vector2(16, 32),
    hFrames: 10,
    vFrames: 1,
    frame,
    position,
  });
}

export class CollectibleItem extends GameObject {
  data: CollectibleItemData;

  constructor(config: CollectibleItemConfig) {
    const { item, x, y, shouldSkipPickupAnimation } = config;

    super({
      position: new Vector2(x, y),
    });
    const frame = ITEMS_SPRITE_FRAME[item];

    this.data = {
      id: crypto.randomUUID(),
      frame,
      position: this.position,
      shouldSkipPickupAnimation: shouldSkipPickupAnimation ?? false,
    };

    const sprite = createCollectibleItemSprite(frame, new Vector2(0, -20));
    this.addChild(sprite);
  }

  ready() {
    events.on<Vector2>('HERO_POSITION', this, (position) => {
      // detect overlap
      const roundedHeroX = Math.round(position.x);
      const roundedHeroY = Math.round(position.y);

      if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picker up a collectible item
    events.emit<CollectibleItemData>('HERO_PICKS_UP_ITEM', this.data);
  }
}
