import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Input } from '../../lib/Input';
import { Camera } from '../Camera';
import { Inventory } from '../Inventory';
import { CHANGE_LEVEL, type Level } from '../Level';
import { PAUSE_OFF, PAUSE_ON, PauseMenu } from '../PauseMenu';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, type SelectionBox } from '../SelectionBox';
import { TEXT_BOX_CLOSE, TEXT_BOX_OPEN, type TextBox } from '../TextBox';

export class Main extends GameObject {
  level: Level | null = null;
  readonly input = new Input();
  readonly camera = new Camera();
  isTextBoxOpened = false;
  isSelectionBoxOpened = false;
  isCutscenePlaying = false;
  isPaused = false;

  private _activePauseMenu: PauseMenu | null = null;

  constructor() {
    super({
      id: 'main',
    });
  }

  override ready(): void {
    const inventory = new Inventory();
    this.addChild(inventory);

    // Change level handler
    Events.on<Level>(CHANGE_LEVEL, this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });

    // Launch text box handler
    Events.on<TextBox>(TEXT_BOX_OPEN, this, (textBox) => {
      this.addChild(textBox);
      this.isTextBoxOpened = true;

      // unsubscribe from this text box after it's destroyed
      const endingSub = Events.on(TEXT_BOX_CLOSE, this, () => {
        textBox.destroy();
        this.isTextBoxOpened = false;
        Events.off(endingSub);
      });
    });

    Events.on<SelectionBox>(SELECTION_BOX_OPEN, this, (selectionBox) => {
      this.addChild(selectionBox);
      this.isSelectionBoxOpened = true;

      // unsubscribe from this selection box after it's destroyed
      const endingSub = Events.on(SELECTION_BOX_CLOSE, this, () => {
        selectionBox.destroy();
        this.isSelectionBoxOpened = false;
        Events.off(endingSub);
      });
    });

    // Events.on(CUTSCENE_START, this, () => {
    //   this.isCutscenePlaying = true;
    // });

    // Events.on(CUTSCENE_END, this, () => {
    //   this.isCutscenePlaying = false;
    // });

    // Launch pause menu handler
    Events.on(PAUSE_ON, this, () => {
      this.isPaused = true;
      const pauseMenu = new PauseMenu();
      this._activePauseMenu = pauseMenu;
      this.addChild(pauseMenu);

      // unsubscribe from this pause menu after it's destroyed
      const endingSub = Events.on(PAUSE_OFF, this, () => {
        pauseMenu.destroy();
        this._activePauseMenu = null;
        this.isPaused = false;
        Events.off(endingSub);
      });
    });
  }

  override step(): void {
    if (this.input.getActionJustPressed('Escape') && this._canTogglePause()) {
      Events.emit(this.isPaused ? PAUSE_OFF : PAUSE_ON);
    }
  }

  private _canTogglePause(): boolean {
    if (this.isSelectionBoxOpened || this.isCutscenePlaying || this.isTextBoxOpened) {
      return false;
    }

    if (this.isPaused && this._activePauseMenu && !this._activePauseMenu.canDismiss) {
      return false;
    }

    return true;
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
