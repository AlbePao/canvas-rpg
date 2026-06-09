import { HERO_REQUESTS_ACTION, TEXT_BOX_CLOSE, TEXT_BOX_OPEN } from '../../constants/events';
import { emitPickupAnimation } from '../../helpers/emitPickupAnimation';
import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import { InteractiveObject } from '../InteractiveObject';
import type { ItemKey } from '../Item';
import { Sprite } from '../Sprite';
import { TextBox } from '../TextBox';
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
    this.shouldRemove = !!removeAfterLoot;

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
      const { x, y } = position;

      if (!this.position.matches([x, y]) || this.status === 'OPEN') {
        return;
      }

      const content = this.getTextContent();

      if (!content) {
        return;
      }

      const { addsFlag, portraitFrame, string, itemKey } = content;

      if (string.length > 0) {
        let contentItemKey: ItemKey | null = null;

        // Potentially add a story flag
        if (addsFlag) {
          StoryFlags.add(addsFlag);
        }

        // Save the item to pick when text box is closed and hero satisfies the story flags
        if (itemKey) {
          contentItemKey = itemKey;
          this._openChest();
        }

        // Emit the textbox
        Events.emit<TextBox>(
          TEXT_BOX_OPEN,
          new TextBox({
            id: `text-box-for-${this.id}`,
            portraitFrame,
            string,
          }),
        );

        const endingSub = Events.on(TEXT_BOX_CLOSE, this, () => {
          // Collect the item after text box close
          this._pickUpItem(contentItemKey);
          Events.off(endingSub);
        });

        return;
      }

      // No text box to display, collect the item directly
      this._openChest();
      this._pickUpItem(itemKey);
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
    emitPickupAnimation(itemKey);

    if (this.shouldRemove) {
      this.destroy();
    }
  }
}
