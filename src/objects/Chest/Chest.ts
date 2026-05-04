import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import { Vector2 } from '../../Vector2';
import { CollectibleItemData } from '../CollectibleItem/CollectibleItem';
import { ItemKey, ITEMS_SPRITE_FRAME } from '../Item/Item';

export type ChestStatus = 'OPEN' | 'CLOSED';

export type ChestConfig = GameObjectBaseConfig & {
  status?: ChestStatus;
  lootConfig: LootConfig;
};

export interface LootConfig {
  // Expand this in the future to support random loot of item or multiple items
  item: ItemKey;
}

export class Chest extends GameObject {
  status: ChestStatus = 'CLOSED';
  isSolid = true;
  body: Sprite;
  lootData: CollectibleItemData;

  constructor({ id, x, y, status, lootConfig }: ChestConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    this.status = status ?? 'CLOSED';
    this.lootData = {
      id: crypto.randomUUID(),
      frame: ITEMS_SPRITE_FRAME[lootConfig.item],
      shouldSkipPickupAnimation: false,
    };

    this.body = new Sprite({
      id: `${id}-chest-sprite`,
      resource: resources.images.chest,
      frameSize: new Vector2(16, 16),
      hFrames: 2,
      vFrames: 1,
      frame: status === 'OPEN' ? 1 : 0,
    });
    this.addChild(this.body);
  }

  ready(): void {
    events.on<GameObject>('HERO_REQUESTS_ACTION', this, (withObject) => {
      if (this.position.matches(withObject.position)) {
        this.openChest();
      }
    });
  }

  openChest() {
    if (this.status === 'OPEN') {
      return;
    }

    // Update chest state and sprite frame to open and emit loot event
    this.status = 'OPEN';
    this.body.frame = 1;

    events.emit<CollectibleItemData>('HERO_PICKS_UP_ITEM', this.lootData);
  }
}
