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
  lootData: LootData;
}

export interface LootData {
  item: ItemKey;
}

export class Chest extends GameObject {
  status: ChestStatus = 'CLOSED';
  isSolid = true;
  lootData: CollectibleItemData;

  constructor(config: ChestConfig) {
    const { x, y, status, lootData } = config;

    super({
      id,
      position: new Vector2(x, y),
    });

    this.status = status ?? 'CLOSED';
    this.lootData = {
      id: crypto.randomUUID(),
      frame: ITEMS_SPRITE_FRAME[lootData.item],
      position: this.position.toNeighbor('DOWN'),
      shouldSkipPickupAnimation: false,
    };

      id: `${id}-chest-sprite`,
      resource: resources.images.chest,
      frameSize: new Vector2(16, 16),
      hFrames: 2,
      vFrames: 1,
      frame: status === 'OPEN' ? 1 : 0,
    });
    this.addChild(sprite);
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

    this.status = 'OPEN';
    this.children.forEach((child) => {
      if (child instanceof Sprite) {
        child.frame = 1; // assuming the sprite is the first child
      }
    });

    events.emit<CollectibleItemData>('HERO_PICKS_UP_ITEM', this.lootData);
  }
}
