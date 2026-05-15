import { HERO_REQUESTS_ACTION, START_TEXT_BOX } from '../../constants/events';
import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import { InteractiveObject } from '../InteractiveObject';
import { SpriteTextBox } from '../SpriteTextBox';
import type { NpcConfig } from './npc.types';

export class Npc extends InteractiveObject {
  body: Sprite;

  constructor({ id, x, y, textConfig, npc }: NpcConfig) {
    super({
      id,
      x,
      y,
      textConfig,
    });

    // Opt into being solid
    this.isSolid = true;

    // Shadow under feet
    const shadow = new Sprite({
      id: `${id}-npc-shadow-sprite`,
      resource: Resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    // Body sprite
    this.body = new Sprite({
      id: `${id}-npc-body-sprite`,
      resource: Resources.images[npc],
      frameSize: new Vector2(32, 32),
      hFrames: 4,
      vFrames: 4,
      position: new Vector2(-8, -20),
      animations: new Animations<NpcAnimationFrame>({
        standing1: new FrameIndexPattern(STANDING_1),
        standing2: new FrameIndexPattern(STANDING_2),
        standing3: new FrameIndexPattern(STANDING_3),
        standing4: new FrameIndexPattern(STANDING_4),
      }),
    });
    this.addChild(this.body);
  }

  // TODO: stop animation when talking and face the hero direction
  override ready(): void {
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const content = this.getTextContent();

      if (!this.position.matches(position) || !content) {
        return;
      }

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
    });
  }
}
