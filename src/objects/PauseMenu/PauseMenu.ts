import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import type { GameObject } from '../../lib/GameObject';
import { Inventory } from '../../lib/Inventory';
import { LevelStateManager } from '../../lib/LevelStateManager';
import { Progress } from '../../lib/Progress';
import { ScreenTransition } from '../../lib/ScreenTransition';
import { StoryFlags } from '../../lib/StoryFlags';
import { getHeroObject } from '../Hero';
import { InventoryScreen } from '../InventoryScreen';
import { SelectionBox } from '../SelectionBox';
import { SettingsMenu } from '../SettingsMenu';
import { TEXT_BOX_CLOSE, TEXT_BOX_OPEN, TextBox } from '../TextBox';
import {
  PAUSE_MENU_ITEMS,
  PAUSE_OFF,
  PAUSE_SAVE_GAME,
  PAUSE_SUB_MENU_CLOSE,
  PAUSE_SUB_MENU_OPEN,
  SAVE_TEXT_BOX_ID,
} from './pauseMenu.constants';
import type { PauseMenuItemValue } from './pauseMenu.types';

export class PauseMenu extends SelectionBox<PauseMenuItemValue> {
  get canDismiss(): boolean {
    return this._canDismiss;
  }
  private _canDismiss = true;

  /**
   * `GameObject.stepEntry()` steps children *before* their parent, and the shared `Input`
   * "just pressed" state isn't cleared until the whole tree has stepped for this frame (see
   * `Game.ts`). That means if a child sub-menu (e.g. `InventoryScreen`) reacts to Enter/Space by
   * closing itself, this class's own `step()` (inherited from `SelectionBox`) would still run
   * *afterwards in that same frame* and see the exact same still-"just pressed" key, immediately
   * re-selecting the current option (e.g. re-opening "Inventory"). To avoid this, unlocking the
   * indicator is deferred to the start of the *next* frame instead of happening synchronously.
   */
  private _pendingIndicatorUnlock = false;

  constructor() {
    super({
      id: 'pause-menu',
      x: 0.5,
      y: 0.5,
      options: PAUSE_MENU_ITEMS,
    });
  }

  override ready(): void {
    Events.on<GameObject>(PAUSE_SUB_MENU_OPEN, this, (pauseSubMenu) => {
      this._canDismiss = false;
      this.addChild(pauseSubMenu);

      // unsubscribe from this sub menu after it's destroyed
      const endingSub = Events.on(PAUSE_SUB_MENU_CLOSE, this, () => {
        pauseSubMenu.destroy();
        this._canDismiss = true;
        this._pendingIndicatorUnlock = true;
        Events.off(endingSub);
      });
    });

    Events.on<TextBox>(TEXT_BOX_CLOSE, this, ({ id }) => {
      if (id === SAVE_TEXT_BOX_ID) {
        this._canDismiss = true;
        this._pendingIndicatorUnlock = true;
      }
    });

    // Save game handler
    Events.on(PAUSE_SAVE_GAME, this, () => {
      const { level } = Game;
      const hero = getHeroObject(level);

      if (!level || !hero) {
        return;
      }

      Progress.save({
        levelId: level.id,
        storyFlags: StoryFlags.flags,
        levelsState: LevelStateManager.state,
        hero: {
          position: hero.gridCoords,
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

  override step(delta: number): void {
    /**
     * Consume the pending unlock before processing any input this frame, and skip this frame's
     * input entirely so the key press that closed the sub menu/text box can't be reused here.
     */
    if (this._pendingIndicatorUnlock) {
      this._pendingIndicatorUnlock = false;
      this.unlockIndicator();
      return;
    }

    super.step(delta);
  }

  protected override onOptionSelect(): void {
    const { key } = this.options[this.currentOptionIndex];

    // Emit pause off to close pause menu
    if (key === 'exit') {
      Events.emit(PAUSE_OFF);
      return;
    }

    // Lock indicator when other options are selected
    this.lockIndicator();

    // Open inventory screen
    if (key === 'inventory') {
      // Open inventory screen with a fade transition, then emit an event to open the inventory screen
      new ScreenTransition(
        () => {
          Events.emit<InventoryScreen>(PAUSE_SUB_MENU_OPEN, new InventoryScreen());
        },
        { transition: 'fadeBlack' },
      );
      return;
    }

    // Open team management screen
    if (key === 'team') {
      console.log('team management...');
      return;
    }

    // Save game progress and open text box
    if (key === 'save') {
      Events.emit(PAUSE_SAVE_GAME);
      return;
    }

    // Open settings submenu
    if (key === 'settings') {
      Events.emit<SettingsMenu>(PAUSE_SUB_MENU_OPEN, new SettingsMenu());
      return;
    }
  }
}
