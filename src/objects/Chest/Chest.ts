import { END_TEXT_BOX, HERO_PICKS_UP_ITEM, HERO_REQUESTS_ACTION, START_TEXT_BOX } from '../../constants/events';
import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import { InteractiveObject } from '../InteractiveObject';
import type { CollectibleItemData, ItemKey } from '../Item';
import { ITEMS_SPRITE_FRAME } from '../Item';
import { SpriteTextBox } from '../SpriteTextBox';
import type { ChestConfig, ChestStatus } from './chest.types';

export class Chest extends InteractiveObject {
  status: ChestStatus = 'CLOSED';
  body: Sprite;
  readonly shouldRemove?: boolean;

  constructor(config: ChestConfig) {
    super(config);

    const { id, status, removeAfterLoot } = config;

    this.isSolid = true;
    this.status = status ?? 'CLOSED';
    this.shouldRemove = removeAfterLoot;

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

      if (!content) {
        return;
      }

      const { addsFlag, portraitFrame, string, item } = content;

      if (string.length > 0) {
        let contentItem: ItemKey | null = null;

        // Potentially add a story flag
        if (addsFlag) {
          StoryFlags.add(addsFlag);
        }

        // Save the item to pick when text box is closed and hero satisfies the story flags
        if (item) {
          contentItem = item;
          this._openChest();
        }

        // Emit the textbox
        Events.emit<SpriteTextBox>(
          START_TEXT_BOX,
          new SpriteTextBox({
            id: `text-box-for-${this.id}`,
            portraitFrame,
            string,
          }),
        );

        const endingSub = Events.on(END_TEXT_BOX, this, () => {
          // Collect the item after text box close
          this._pickUpItem(contentItem);
          Events.off(endingSub);
        });

        return;
      }

      // No text box to display, collect the item directly
      this._openChest();
      this._pickUpItem(item);
    });
  }

  private _openChest(): void {
    // Update chest state and sprite frame to open
    this.status = 'OPEN';
    this.body.frame = 1;
  }

  private _pickUpItem(itemKey: ItemKey | null): void {
    if (!itemKey) {
      return;
    }

    // Emit pick up item event
    Events.emit<CollectibleItemData>(HERO_PICKS_UP_ITEM, {
      id: crypto.randomUUID(),
      frame: ITEMS_SPRITE_FRAME[itemKey],
      shouldSkipPickupAnimation: false,
    });

    if (this.shouldRemove) {
      this.destroy();
    }
  }
}
