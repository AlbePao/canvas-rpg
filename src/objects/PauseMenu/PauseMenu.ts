import {
  PAUSE_OFF,
  PAUSE_SUB_MENU_CLOSE,
  PAUSE_SUB_MENU_OPEN,
  TEXT_BOX_CLOSE,
  TEXT_BOX_OPEN,
} from '../../constants/events';
import { Events } from '../../lib/Events';
import type { GameObject } from '../../lib/GameObject';
import { InventoryBox } from '../InventoryBox';
import { SelectionBox } from '../SelectionBox';
import { TextBox } from '../TextBox';
import type { PauseMenuOption } from './pauseMenu.types';

const SAVE_TEXT_BOX_ID = 'save-text-box';
const PAUSE_MENU_OPTIONS: PauseMenuOption[] = [
  { text: 'Inventory', value: 'inventory' },
  { text: 'Map', value: 'map' },
  { text: 'Team', value: 'team' },
  { text: 'Save', value: 'save' },
  { text: 'Options', value: 'options' },
  { text: 'Exit', value: 'exit' },
] as const;

export class PauseMenu extends SelectionBox {
  get canDismiss(): boolean {
    return this._canDismiss;
  }
  private _canDismiss = true;

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
        this.unlockIndicator();
        Events.off(endingSub);
      });
    });

    Events.on<TextBox>(TEXT_BOX_CLOSE, this, ({ id }) => {
      if (id === SAVE_TEXT_BOX_ID) {
        this._canDismiss = true;
        this.unlockIndicator();
      }
    });
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

    // Save and open text box
    if (value === 'save') {
      // TODO: add save feature, then open text box
      Events.emit<TextBox>(
        TEXT_BOX_OPEN,
        new TextBox({
          id: SAVE_TEXT_BOX_ID,
          text: ['Progress saved!'],
          speed: 2,
        }),
      );
      return;
    }

    // Open other options sub menus
    if (value === 'inventory') {
      Events.emit<InventoryBox>(PAUSE_SUB_MENU_OPEN, new InventoryBox());
    }
  }
}
