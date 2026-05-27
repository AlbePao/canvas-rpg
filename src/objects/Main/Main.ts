import {
  CHANGE_LEVEL,
  CUTSCENE_END,
  CUTSCENE_START,
  PAUSE_OFF,
  PAUSE_ON,
  TEXT_BOX_END,
  TEXT_BOX_START,
} from '../../constants/events';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Input } from '../../lib/Input';
import { Camera } from '../Camera';
import { Inventory } from '../Inventory';
import type { Level } from '../Level';
import { PauseMenu } from '../PauseMenu';
import type { SpriteTextBox } from '../SpriteTextBox';

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
    Events.on<SpriteTextBox>(TEXT_BOX_START, this, (textBox) => {
      this.addChild(textBox);

      // unsubscribe from this text box after it's destroyed
      const endingSub = Events.on(TEXT_BOX_END, this, () => {
        textBox.destroy();
        Events.off(endingSub);
      });
    });

    Events.on(CUTSCENE_START, this, () => {
      this.isCutscenePlaying = true;
    });

    Events.on(CUTSCENE_END, this, () => {
      this.isCutscenePlaying = false;
    });

    // Launch pause menu handler
    Events.on(PAUSE_ON, this, () => {
      const pauseMenu = new PauseMenu();
      this.addChild(pauseMenu);

      // unsubscribe from this pause menu after it's destroyed
      const endingSub = Events.on(PAUSE_OFF, this, () => {
        pauseMenu.destroy();
        // this.isPaused = false;
        Events.off(endingSub);
      });
    });
  }

  override step(_delta: number, _root: Main): void {
    if (this.input.getActionJustPressed('Escape')) {
      this.isPaused = !this.isPaused;
      Events.emit(this.isPaused ? PAUSE_ON : PAUSE_OFF);
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
