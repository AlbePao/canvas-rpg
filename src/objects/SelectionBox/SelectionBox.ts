import { calculateTextWidth, createSpriteTextLines } from '../../helpers/spriteText';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import type { Line } from '../../types/text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import type { Main } from '../Main';
import { SELECTION_BOX_CLOSE } from './selectionBox.constants';
import type { SelectionBoxConfig, SelectionOption } from './selectionBox.types';

export class SelectionBox extends GameObject {
  protected readonly options: SelectionOption[];
  protected currentOptionIndex = 0;
  private readonly _optionsLines: Line[];
  // Handles the index of the first visible element in the viewport
  private _scrollOffset = 0;

  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-selection-box-backdrop`,
    width: 0,
    height: 0,
  });
  private readonly _indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'RIGHT',
  });

  private _isIndicatorLocked = false;

  constructor(config: SelectionBoxConfig) {
    const { id, x, y, options } = config;

    super({
      id,
    });

    if (options.length < 1) {
      throw new Error('SelectionBox: options array must have at least one element');
    }

    const { toGridSize, gridSize } = Game;

    // Draw on top layer
    this.drawLayer = 'HUD';

    this.options = options.filter(
      ({ exclude, include }) =>
        (exclude?.some((flag) => !StoryFlags.has(flag)) ?? true) &&
        (include?.some((flag) => StoryFlags.has(flag)) ?? true),
    );
    this._optionsLines = createSpriteTextLines(
      this.options.map(({ text }) => text),
      this.id,
    );

    const width = Math.max(...this.options.map(({ text }) => calculateTextWidth(text))) + 52; // Add padding for the indicator and some spacing

    const height = toGridSize(this.options.length) + gridSize; // Each option is 16px tall + some padding

    // Set backdrop size according to its options' size
    this._backdrop.updateSize(width / gridSize, height / gridSize);

    // If position x and y are set from config, use that params, otherwise set the position according to options size in relation to canvas width and text box height
    const { canvasWidth, canvasHeight } = Game.containerSizes;
    const newX = x ? toGridSize(x) : canvasWidth - width - 32;
    const newY = y ? toGridSize(y) : canvasHeight - height - toGridSize(Game.textBoxBackdropHeight) - 4;
    this.position = new Vector2(newX, newY);
  }

  override step(_delta: number, root: Main): void {
    if (this._isIndicatorLocked) {
      return;
    }

    const { input } = root;

    const isOptionSelected = input.getActionJustPressed('Space') || input.getActionJustPressed('Enter');
    const isArrowUpPressed = input.getActionJustPressed('ArrowUp') || input.getActionJustPressed('KeyW');
    const isArrowDownPressed = input.getActionJustPressed('ArrowDown') || input.getActionJustPressed('KeyS');

    if (isOptionSelected) {
      // Emit selected option
      this.onOptionSelect();
    } else if (isArrowUpPressed) {
      // Move arrow up
      this.currentOptionIndex = (this.currentOptionIndex - 1 + this.options.length) % this.options.length;
      this._updateScrollOffset();
    } else if (isArrowDownPressed) {
      // Move arrow down
      this.currentOptionIndex = (this.currentOptionIndex + 1) % this.options.length;
      this._updateScrollOffset();
    }
  }

  // Update scroll shift
  private _updateScrollOffset(): void {
    if (this.currentOptionIndex < this._scrollOffset) {
      // If current index has gone above the start of the viewport
      this._scrollOffset = this.currentOptionIndex;
    } else if (this.currentOptionIndex >= this._scrollOffset) {
      // If current index has gone below the start of the viewport
      this._scrollOffset = this.currentOptionIndex + 1;
    }
  }
  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    const { toGridSize } = Game;

    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator
    this._indicator.drawImage(ctx, drawPosX + 4, drawPosY + 10 + toGridSize(this.currentOptionIndex));

    // Draw options text lines
    this._optionsLines.forEach(({ words }, index) => {
      let cursorX = drawPosX + 18;
      const cursorY = drawPosY + toGridSize(index) + 10;

      words.forEach(({ chars }) => {
        // Draw this whole segment of text
        chars.forEach((char) => {
          const { sprite, width } = char;
          const widthCharOffset = cursorX - 5;
          sprite.draw(ctx, widthCharOffset, cursorY);

          // Add width of the character we just printed to cursor pos, plus 1px between character
          cursorX += width + 1;
        });

        // Move the cursor over
        cursorX += 3;
      });
    });
  }

  protected onOptionSelect(): void {
    Events.emit<SelectionOption>(SELECTION_BOX_CLOSE, this.options[this.currentOptionIndex]);
  }

  protected lockIndicator(): void {
    this._isIndicatorLocked = true;
  }

  protected unlockIndicator(): void {
    this._isIndicatorLocked = false;
  }
}
