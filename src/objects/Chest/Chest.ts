import { Events } from '../../lib/Events';
import { GRID_SIZE } from '../../lib/Game';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import { emitHeroItemCollect, HERO_OPENS_CHEST, HERO_REQUESTS_ACTION } from '../Hero';
import { InteractiveObject } from '../InteractiveObject';
import type { ItemKey } from '../Item';
import { Sprite } from '../Sprite';
import { TEXT_BOX_CLOSE, TEXT_BOX_OPEN, TextBox } from '../TextBox';
import type { ChestConfig, ChestStatus } from './chest.types';

export class Chest extends InteractiveObject {
  private readonly _body: Sprite;

  public get status(): ChestStatus {
    return this._status;
  }
  private _status: ChestStatus = 'CLOSED';

  get removeAfterLoot(): boolean {
    return this._removeAfterLoot;
  }
  private readonly _removeAfterLoot: boolean;

  constructor(config: ChestConfig) {
    super(config);

    const { id, status = 'CLOSED', removeAfterLoot = false } = config;

    this.isSolid = true;
    this._status = status;
    this._removeAfterLoot = removeAfterLoot;

    this._body = new Sprite({
      id: `${id}-chest-sprite`,
      resource: Resources.images.chest,
      frameSize: new Vector2(GRID_SIZE, GRID_SIZE),
      hFrames: 2,
      vFrames: 1,
      frame: status === 'OPEN' ? 1 : 0,
    });
    this.addChild(this._body);
  }

  override ready(): void {
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const { x, y } = position;

      if (!this.position.matches([x, y]) || this._status === 'OPEN') {
        return;
      }

      const content = this.getContent();

      if (!content) {
        return;
      }

      const { addsFlag, portraitFrame, text, itemKey } = content;

      if (text.length > 0) {
        let contentItemKey: ItemKey | null = null;

        // Potentially add a story flag
        if (addsFlag) {
          StoryFlags.add(addsFlag);
        }

        // Save the item to collect when text box is closed and hero satisfies the story flags
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
            text,
          }),
        );

        const endingSub = Events.on(TEXT_BOX_CLOSE, this, () => {
          // Collect the item after text box close
          this._collectItem(contentItemKey);
          Events.off(endingSub);
        });

        return;
      }

      // No text box to display, collect the item directly
      this._openChest();
      this._collectItem(itemKey);
    });
  }

  private _openChest(): void {
    // Update chest state and sprite frame to open
    this._status = 'OPEN';
    this._body.frame = 1;
  }

  private _collectItem(itemKey: ItemKey | null): void {
    if (!itemKey) {
      return;
    }

    // Emit item collect event
    emitHeroItemCollect(itemKey);

    // Emit chest opened event
    Events.emit<Chest>(HERO_OPENS_CHEST, this);

    if (this._removeAfterLoot) {
      this.destroy();
    }
  }
}
