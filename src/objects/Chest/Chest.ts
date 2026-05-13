import { END_TEXT_BOX, HERO_PICKS_UP_ITEM, HERO_REQUESTS_ACTION, START_TEXT_BOX } from '../../constants/events';
import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import { InteractiveObject } from '../InteractiveObject';
import type { CollectibleItemData } from '../Item';
import { ITEMS_SPRITE_FRAME } from '../Item';
import { SpriteTextBox } from '../SpriteTextBox';
import type { ChestConfig, ChestStatus } from './chest.types';

// TODO: add story flags checks with requires and bypass properties for when a chest needs a key and/or hero already has it
export class Chest extends InteractiveObject {
  status: ChestStatus = 'CLOSED';
  body: Sprite;
  lootData: CollectibleItemData;

  constructor({ id, x, y, status, lootConfig, textConfig }: ChestConfig) {
    super({
      id,
      x,
      y,
      textConfig,
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
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      if (!this.position.matches(position) || this.status === 'OPEN') {
        return;
      }

      const content = this.getTextContent();

      if (content) {
        // Potentially add a story flag
        if (content.addsFlag) {
          StoryFlags.add(content.addsFlag);
        }

        // Emit the textbox
        Events.emit<SpriteTextBox>(
          START_TEXT_BOX,
          new SpriteTextBox({
            id: `text-box-for-${this.id}`,
            portraitFrame: content.portraitFrame,
            string: content.string,
          }),
        );

        Events.on(END_TEXT_BOX, this, () => {
          // Open chest after text box close
          this.openChest();
        });
      } else {
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
