import { CHANGE_LEVEL, END_TEXT_BOX, HERO_REQUESTS_ACTION, START_TEXT_BOX } from '../../constants/events';
import { Camera } from '../../lib/Camera';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Input } from '../../lib/Input';
import { StoryFlags } from '../../lib/StoryFlags';
import { Inventory } from '../Inventory';
import type { Level } from '../Level';
import { Npc } from '../Npc';
import { SpriteTextString } from '../SpriteTextString';

export class Main extends GameObject {
  level: Level | null = null;
  input = new Input();
  camera = new Camera();

  constructor() {
    super({ id: 'main' });
  }

  override ready(): void {
    const inventory = new Inventory();
    this.addChild(inventory);

    // Change level handler
    Events.on<Level>(CHANGE_LEVEL, this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });

    // Launch text box handler
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, (withObject) => {
      if (withObject instanceof Npc) {
        const content = withObject.getContent();

        if (!content) {
          return;
        }

        // Potentially add a story flag
        if (content.addsFlag) {
          StoryFlags.add(content.addsFlag);
        }

        // Show the textbox
        const textBox = new SpriteTextString({
          id: `text-box-for-${withObject.id}`,
          portraitFrame: content.portraitFrame,
          string: content.string,
        });
        this.addChild(textBox);

        Events.emit(START_TEXT_BOX);

        // unsubscribe from this text box after it's destroyed
        const endingSub = Events.on(END_TEXT_BOX, this, () => {
          textBox.destroy();
          Events.off(endingSub);
        });
      }
    });
  }

  setLevel(newLevelInstance: Level): void {
    if (this.level) {
      this.level.destroy();
    }

    this.level = newLevelInstance;
    this.addChild(this.level);
  }

  drawBackground(ctx: CanvasRenderingContext2D): void {
    this.level?.background?.drawImage(ctx, 0, 0);
  }

  drawObjects(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      if (child.drawLayer !== 'HUD') {
        child.draw(ctx, 0, 0);
      }
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D): void {
    this.children.forEach((child) => {
      if (child.drawLayer === 'HUD') {
        child.draw(ctx, 0, 0);
      }
    });
  }
}
