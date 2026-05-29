import { SELECTION_BOX_CLOSED } from '../../constants/events';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import type { Main } from '../Main';
import type { SelectionBoxConfig, SelectionOption } from './selectionBox.types';

export class SelectionBox extends GameObject {
  options: SelectionOption[];
  currentOptionIndex = 0;

  constructor(config: SelectionBoxConfig) {
    const { id, x, y, options } = config;

    super({
      id,
      x,
      y,
    });

    this.options = options;
  }

  override ready(): void {
    Events.on(SELECTION_BOX_CLOSED, this, () => {
      this.destroy();
    });
  }

  override step(_delta: number, root: Main): void {
    const { input } = root;

    const isOptionSelected = input.getActionJustPressed('Space') || input.getActionJustPressed('Enter');
    const isArrowPressed =
      input.getActionJustPressed('ArrowUp') ||
      input.getActionJustPressed('ArrowDown') ||
      input.getActionJustPressed('KeyW') ||
      input.getActionJustPressed('KeyS');

    if (isOptionSelected) {
      Events.emit(SELECTION_BOX_CLOSED, {});
    } else if (isArrowPressed) {
      // TODO: increment or decrement selection index
    }
  }

  override drawImage(_ctx: CanvasRenderingContext2D, _x: number, _y: number): void {
    // TODO: draw selection box and its options
  }
}
