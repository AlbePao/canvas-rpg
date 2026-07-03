import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import { InventoryMenu } from '../InventoryMenu';
import { OptionsMenu } from '../OptionsMenu';
import { SelectionBox } from '../SelectionBox';
import type { TextBox } from '../TextBox';
import { TEXT_BOX_CLOSE } from '../TextBox';
import {
  PAUSE_MENU_OPTIONS,
  PAUSE_OFF,
  PAUSE_SAVE_GAME,
  PAUSE_SUB_MENU_CLOSE,
  PAUSE_SUB_MENU_OPEN,
  SAVE_TEXT_BOX_ID,
} from './pauseMenu.constants';

export class PauseMenu extends SelectionBox {
  get canDismiss(): boolean {
    return this._canDismiss;
  }
  private _canDismiss = true;

  /**
   * `GameObject.stepEntry()` steps children *before* their parent, and the shared `Input`
   * "just pressed" state isn't cleared until the whole tree has stepped for this frame (see
   * `Game.ts`). That means if a child sub-menu (e.g. `InventoryMenu`) reacts to Enter/Space by
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
      options: PAUSE_MENU_OPTIONS,
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
    const { value } = this.options[this.currentOptionIndex];

    // Emit pause off to close pause menu
    if (value === 'exit') {
      Events.emit(PAUSE_OFF);
      return;
    }

    // Lock indicator when other options are selected
    this.lockIndicator();

    // Open inventory screen
    if (value === 'inventory') {
      Events.emit<InventoryMenu>(PAUSE_SUB_MENU_OPEN, new InventoryMenu());
      return;
    }

    // Open team management screen
    if (value === 'team') {
      console.log('team management...');
      return;
    }

    // Save game progress and open text box
    if (value === 'save') {
      Events.emit(PAUSE_SAVE_GAME);
      return;
    }

    // Open options submenu
    if (value === 'options') {
      Events.emit<OptionsMenu>(PAUSE_SUB_MENU_OPEN, new OptionsMenu());
      return;
    }
  }
}
