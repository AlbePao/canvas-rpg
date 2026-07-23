import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { LevelBuilder, type LevelBuilderConfig } from '../../lib/LevelBuilder';
import type { MenuScreen } from '../../lib/MenuScreen';
import { MENU_SCREEN_CLOSE, MENU_SCREEN_OPEN } from '../../lib/MenuScreen';
import { BATTLE_END, BATTLE_START, type Battle } from '../Battle';
import { Camera } from '../Camera';
import { getHeroObject } from '../Hero';
import { CHANGE_LEVEL, type Level } from '../Level';
import { CUTSCENE_END, CUTSCENE_START } from '../MovableObject';
import { PAUSE_OFF, PAUSE_ON, PauseMenu } from '../PauseMenu';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, type SelectionBox } from '../SelectionBox';
import type { TextBox } from '../TextBox';
import { TEXT_BOX_CLOSE, TEXT_BOX_OPEN } from '../TextBox';
import { TitleScreen } from '../TitleScreen';
import type { MainScreen } from './main.types';

export class Main extends GameObject {
  private _currentScreen: MainScreen = 'TITLE';
  readonly camera = new Camera();

  private _isTextBoxOpened = false;
  private _isSelectionBoxOpened = false;
  private _isCutscenePlaying = false;
  private _isPaused = false;
  private _isBattlePlaying = false;

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
    if (gameObject.drawLayer === 'hud') {
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
      this._isTextBoxOpened = true;

      // unsubscribe from this text box after it's destroyed
      const endingSub = Events.on(TEXT_BOX_CLOSE, this, () => {
        textBox.destroy();
        this._isTextBoxOpened = false;
        Events.off(endingSub);
      });
    });

    Events.on<SelectionBox>(SELECTION_BOX_OPEN, this, (selectionBox) => {
      this.addChild(selectionBox);
      this._isSelectionBoxOpened = true;

      // unsubscribe from this selection box after it's destroyed
      const endingSub = Events.on(SELECTION_BOX_CLOSE, this, () => {
        selectionBox.destroy();
        this._isSelectionBoxOpened = false;
        Events.off(endingSub);
      });
    });

    Events.on<Battle>(BATTLE_START, this, (battle) => {
      this._currentScreen = 'BATTLE';
      this._isBattlePlaying = true;
      this.addChild(battle);

      const { level } = Game;
      const hero = getHeroObject(level);

      if (!level || !hero) {
        throw new Error('No level is currently loaded when starting a battle');
      }

      // Save level id and hero position before battle starts so we can restore it after battle ends
      const levelConfig: LevelBuilderConfig = {
        id: level.id,
        heroStartPosition: hero.gridCoords,
        heroFacingDirection: hero.facingDirection,
      };

      // Destroy the current level instance to free up memory
      Game.level?.destroy();

      // unsubscribe from this battle after its end
      const endingSub = Events.on(BATTLE_END, this, () => {
        this._currentScreen = 'LEVEL';
        this._isBattlePlaying = false;

        // Restore level state after battle ending and destroy battle instance to free up memory
        this._setLevel(new LevelBuilder(levelConfig));
        battle.destroy();
        Events.off(endingSub);
      });
    });

    Events.on(CUTSCENE_START, this, () => {
      this._isCutscenePlaying = true;

      const endingSub = Events.on(CUTSCENE_END, this, () => {
        this._isCutscenePlaying = false;
        Events.off(endingSub);
      });
    });

    // Launch pause menu handler
    Events.on(PAUSE_ON, this, () => {
      this._isPaused = true;
      const pauseMenu = new PauseMenu();
      this._activePauseMenu = pauseMenu;
      this.addChild(pauseMenu);

      // unsubscribe from this pause menu after it's destroyed
      const endingSub = Events.on(PAUSE_OFF, this, () => {
        pauseMenu.destroy();
        this._activePauseMenu = null;
        this._isPaused = false;
        Events.off(endingSub);
      });
    });

    // Launch menu screen handler. A menu screen can be opened from everywhere in the game (e.g., from title screen, pause menu, etc.) and it will be handled by Main class
    Events.on<MenuScreen>(MENU_SCREEN_OPEN, this, (menuScreen) => {
      const currentScreen = this._currentScreen;
      this._currentScreen = 'MENU_SCREEN';
      this.addChild(menuScreen);

      // unsubscribe from this menu screen after it's destroyed
      const endingSub = Events.on(MENU_SCREEN_CLOSE, this, () => {
        menuScreen.destroy();
        this._currentScreen = currentScreen;
        Events.off(endingSub);
      });
    });
  }

  override step(): void {
    if (Game.input.getActionJustPressed('Escape') && this._canTogglePause()) {
      Events.emit(this._isPaused ? PAUSE_OFF : PAUSE_ON);
    }
  }

  private _canTogglePause(): boolean {
    if (
      this._currentScreen !== 'LEVEL' ||
      this._isSelectionBoxOpened ||
      this._isCutscenePlaying ||
      this._isTextBoxOpened ||
      this._isBattlePlaying ||
      (this._isPaused && this._activePauseMenu && !this._activePauseMenu.canDismiss)
    ) {
      return false;
    }

    return true;
  }

  startTitleScreen(): void {
    this.addChild(new TitleScreen());
  }

  private _setLevel(newLevelInstance: Level): void {
    // If level is set programmatically from CHANGE_LEVEL event (e.g., from title screen or a cutscene), set automatically current screen as level
    if (this._currentScreen !== 'LEVEL') {
      this._currentScreen = 'LEVEL';
    }

    if (Game.level) {
      Game.level.destroy();
    }

    Game.level = newLevelInstance;
    this.addChild(Game.level);
  }

  drawBackground(ctx: CanvasRenderingContext2D): void {
    Game.level?.background?.drawImage(ctx, 0, 0);
  }

  drawObjects(ctx: CanvasRenderingContext2D): void {
    for (const child of this._nonHudChildren) {
      child.draw(ctx, 0, 0);
    }
  }

  drawForeground(ctx: CanvasRenderingContext2D): void {
    for (const child of this._hudChildren) {
      child.draw(ctx, 0, 0);
    }
  }
}
