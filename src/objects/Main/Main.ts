import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Input } from '../../lib/Input';
import { Inventory } from '../../lib/Inventory';
import { LevelStateManager } from '../../lib/LevelStateManager';
import { Progress } from '../../lib/Progress';
import { StoryFlags } from '../../lib/StoryFlags';
import { Camera } from '../Camera';
import { getHeroObject } from '../Hero';
import { CHANGE_LEVEL, type Level } from '../Level';
import { PAUSE_OFF, PAUSE_ON, PAUSE_SAVE_GAME, PauseMenu, SAVE_TEXT_BOX_ID } from '../PauseMenu';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, type SelectionBox } from '../SelectionBox';
import { TEXT_BOX_CLOSE, TEXT_BOX_OPEN, TextBox } from '../TextBox';
import { TitleScreen } from '../TitleScreen';

export class Main extends GameObject {
  level: Level | null = null;
  private _currentScreen: 'GAME' | 'TITLE' | 'BATTLE' = 'TITLE';
  readonly input = new Input();
  readonly camera = new Camera();
  isTextBoxOpened = false;
  isSelectionBoxOpened = false;
  isCutscenePlaying = false;
  isPaused = false;

  private _activePauseMenu: PauseMenu | null = null;

  // Cached HUD/non-HUD split so drawObjects/drawForeground don't re-filter `children` every frame
  private _hudChildren: GameObject[] = [];
  private _nonHudChildren: GameObject[] = [];

  constructor() {
    super({
      id: 'main',
    });
  }

  override addChild(gameObject: GameObject): void {
    super.addChild(gameObject);
    if (gameObject.drawLayer === 'HUD') {
      this._hudChildren.push(gameObject);
    } else {
      this._nonHudChildren.push(gameObject);
    }
  }

  override removeChild(gameObject: GameObject): void {
    super.removeChild(gameObject);
    this._hudChildren = this._hudChildren.filter((child) => child !== gameObject);
    this._nonHudChildren = this._nonHudChildren.filter((child) => child !== gameObject);
  }

  override ready(): void {
    // Change level handler
    Events.on<Level>(CHANGE_LEVEL, this, (newLevelInstance) => {
      this._setLevel(newLevelInstance);
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

    // Save game handler
    Events.on(PAUSE_SAVE_GAME, this, () => {
      const hero = getHeroObject(this.level);

      if (!this.level || !hero) {
        return;
      }

      const { gridCoords, facingDirection } = hero;

      Progress.save({
        levelId: this.level.id,
        storyFlags: StoryFlags.flags,
        levelsState: LevelStateManager.state,
        hero: {
          position: gridCoords,
          direction: facingDirection,
          inventory: Inventory.getAll(),
        },
      });

      Events.emit<TextBox>(
        TEXT_BOX_OPEN,
        new TextBox({
          id: SAVE_TEXT_BOX_ID,
          text: ['Progress saved!'],
          speed: 2,
        }),
      );
    });
  }

  override step(): void {
    if (this.input.getActionJustPressed('Escape') && this._canTogglePause()) {
      Events.emit(this.isPaused ? PAUSE_OFF : PAUSE_ON);
    }
  }

  private _canTogglePause(): boolean {
    if (
      this._currentScreen !== 'GAME' ||
      this.isSelectionBoxOpened ||
      this.isCutscenePlaying ||
      this.isTextBoxOpened ||
      (this.isPaused && this._activePauseMenu && !this._activePauseMenu.canDismiss)
    ) {
      return false;
    }

    return true;
  }

  startTitleScreen(): void {
    this.addChild(new TitleScreen());
  }

  private _setLevel(newLevelInstance: Level): void {
    // If level is set programmatically like from title screen or a cutscene, set current screen as game
    if (this._currentScreen !== 'GAME') {
      this._currentScreen = 'GAME';
    }

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
    this._nonHudChildren.forEach((child) => {
        child.draw(ctx, 0, 0);
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D): void {
    this._hudChildren.forEach((child) => {
        child.draw(ctx, 0, 0);
    });
  }
}
