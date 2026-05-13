import { END_TEXT_BOX, HERO_PICKS_UP_ITEM, HERO_REQUESTS_ACTION, START_TEXT_BOX } from '../../constants/events';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { StoryFlags } from '../../lib/StoryFlags';
import type { TextContent, TextContentConfig } from '../../lib/StoryFlags/storyFlags.types';
import { Vector2 } from '../../lib/Vector2';
import type { CollectibleItemData } from '../Item';
import { ITEMS_SPRITE_FRAME } from '../Item';
import { SpriteTextString } from '../SpriteTextString';
import type { ChestConfig, ChestStatus } from './chest.types';

export class Chest extends GameObject {
  textContent?: TextContentConfig[];
  status: ChestStatus = 'CLOSED';
  body: Sprite;
  lootData: CollectibleItemData;

  constructor({ id, x, y, status, lootConfig, textConfig }: ChestConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    this.isSolid = true;
    this.textContent = textConfig;
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
        Events.emit<SpriteTextString>(
          START_TEXT_BOX,
          new SpriteTextString({
            id: `text-box-for-${this.id}`,
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

  getTextContent(): TextContent | null {
    if (!this.textContent) {
      return null;
    }

    const match = StoryFlags.getRelevantScenario(this.textContent);

    if (!match) {
      console.warn('No matches found in this list!', this.textContent);
      return null;
    }

    return {
      string: match.string,
      addsFlag: match.addsFlag ?? null,
    };
  }
}
