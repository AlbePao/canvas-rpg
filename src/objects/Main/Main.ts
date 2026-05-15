import { CHANGE_LEVEL, END_TEXT_BOX, START_TEXT_BOX } from '../../constants/events';
import { Camera } from '../../lib/Camera';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Input } from '../../lib/Input';
import { Inventory } from '../Inventory';
import type { Level } from '../Level';
import type { SpriteTextBox } from '../SpriteTextBox';

// TODO add a global flag to stop npcs animations and movements (e.g. when a textbox is opened)
export class Main extends GameObject {
  level: Level | null = null;
  input = new Input();
  camera = new Camera();
  isCutscenePlaying = false;
  isPaused = false;

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
    Events.on<SpriteTextBox>(START_TEXT_BOX, this, (textBox) => {
      this.addChild(textBox);

      // unsubscribe from this text box after it's destroyed
      const endingSub = Events.on(END_TEXT_BOX, this, () => {
        textBox.destroy();
        Events.off(endingSub);
      });
    });
  }

  override step(_delta: number, _root: GameObject): void {
    if (this.input.getActionJustPressed('Escape')) {
      // TODO: add pause menu child
      this.isPaused = !this.isPaused;
    }
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
