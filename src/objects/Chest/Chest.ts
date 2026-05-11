import { HERO_PICKS_UP_ITEM, HERO_REQUESTS_ACTION } from '../../constants/events';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { Vector2 } from '../../lib/Vector2';
import type { CollectibleItemData } from '../Item';
import { ITEMS_SPRITE_FRAME } from '../Item';
import type { ChestConfig, ChestStatus } from './chest.types';

export class Chest extends GameObject {
  status: ChestStatus = 'CLOSED';
  body: Sprite;
  lootData: CollectibleItemData;

  constructor({ id, x, y, status, lootConfig }: ChestConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    this.isSolid = true;
    this.status = status ?? 'CLOSED';
    this.lootData = {
      id: crypto.randomUUID(),
      frame: ITEMS_SPRITE_FRAME[lootConfig.item],
      shouldSkipPickupAnimation: false,
    };

    this.body = new Sprite({
      id: `${id}-chest-sprite`,
      resource: Resources.images.chest,
      frameSize: new Vector2(16, 16),
      hFrames: 2,
      vFrames: 1,
      frame: status === 'OPEN' ? 1 : 0,
    });
    this.addChild(this.body);
  }

  override ready(): void {
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, (withObject) => {
      if (this.position.matches(withObject.position)) {
        this.openChest();
      }
    });
  }

  openChest(): void {
    if (this.status === 'OPEN') {
      return;
    }

    // Update chest state and sprite frame to open and emit loot event
    this.status = 'OPEN';
    this.body.frame = 1;

    Events.emit<CollectibleItemData>(HERO_PICKS_UP_ITEM, this.lootData);
  }
}
