import { Camera } from '../../Camera';
import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { Input } from '../../Input';
import { storyFlags } from '../../StoryFlags';
import { Inventory } from '../Inventory/Inventory';
import { Level } from '../Level/Level';
import { Npc } from '../Npc/Npc';
import { SpriteTextString } from '../SpriteTextString/SpriteTextString';

export class Main extends GameObject {
  level: Level | null = null;
  input = new Input();
  camera = new Camera();

  constructor() {
    super({ id: 'main' });
  }

  ready(): void {
    const inventory = new Inventory();
    this.addChild(inventory);

    // Change level handler
    events.on<Level>('CHANGE_LEVEL', this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });

    // Launch text box handler
    events.on<GameObject>('HERO_REQUESTS_ACTION', this, (withObject) => {
      if (withObject instanceof Npc) {
        const content = withObject.getContent();

        if (!content) {
          return;
        }

        // Potentially add a story flag
        if (content.addsFlag) {
          storyFlags.add(content.addsFlag);
        }

        // Show the textbox
        const textBox = new SpriteTextString({
          id: `text-box-for-${withObject.id}`,
          portraitFrame: content.portraitFrame,
          string: content.string,
        });
        this.addChild(textBox);

        events.emit('START_TEXT_BOX');

        // unsubscribe from this text box after it's destroyed
        const endingSub = events.on('END_TEXT_BOX', this, () => {
          textBox.destroy();
          events.off(endingSub);
        });
      }
    });
  }

  setLevel(newLevelInstance: Level) {
    if (this.level) {
      this.level.destroy();
    }

    this.level = newLevelInstance;
    this.addChild(this.level);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level?.background?.drawImage(ctx, 0, 0);
  }

  drawObjects(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer !== 'HUD') {
        child.draw(ctx, 0, 0);
      }
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer === 'HUD') {
        child.draw(ctx, 0, 0);
      }
    });
  }
}
