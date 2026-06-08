import { SelectionBox } from '../SelectionBox';
import type { PauseMenuOption } from './pauseMenu.types';

const PAUSE_MENU_OPTIONS: PauseMenuOption[] = [
  { text: 'Inventory', value: 'inventory' },
  { text: 'Map', value: 'map' },
  { text: 'Team', value: 'team' },
  { text: 'Save', value: 'save' },
  { text: 'Options', value: 'options' },
  { text: 'Exit', value: 'exit' },
];

export class PauseMenu extends SelectionBox {
  constructor() {
    super({
      id: 'pauseMenu',
      x: 8,
      y: 4,
      options: PAUSE_MENU_OPTIONS,
    });

    // Draw on top layer
    this.drawLayer = 'HUD';
  }

  protected override emitSelection(): void {
    console.log('selected pause option', this.options[this.currentOptionIndex]);
  }
}
