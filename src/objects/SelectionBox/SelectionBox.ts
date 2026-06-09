import { SELECTION_BOX_CLOSED } from '../../constants/events';
import { GRID_SIZE } from '../../constants/gridSize';
import { createSpriteTextLines } from '../../helpers/createSpriteTextLines';
import { ArrowIndicator } from '../../lib/ArrowIndicator';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import { BoxBackdrop } from '../BoxBackdrop';
import type { Main } from '../Main';
import { getCharacterWidth, type Line } from '../SpriteTextBox';
import type { SelectionBoxConfig, SelectionOption } from './selectionBox.types';

export class SelectionBox extends GameObject {
  protected readonly options: SelectionOption[];
  protected currentOptionIndex = 0;
  private readonly _optionsLines: Line[];

  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-selection-box-backdrop`,
    width: 0,
    height: 0,
  });
  private readonly _indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'RIGHT',
  });

  constructor(config: SelectionBoxConfig) {
    const { id, x, y, options } = config;

    super({
      id,
      x,
      y,
    });

    if (options.length < 1) {
      throw new Error('SelectionBox: options array must have at least one element');
    }

    // Draw on top layer
    this.drawLayer = 'HUD';

    this.options = options.filter(
      ({ exclude, include }) =>
        (exclude ? exclude.some((flag) => !StoryFlags.has(flag)) : true) &&
        (include ? include.some((flag) => StoryFlags.has(flag)) : true),
    );
    this._optionsLines = createSpriteTextLines(
      this.options.map(({ text }) => text),
      `${this.id}`,
    );

    const width =
      Math.max(
        ...this.options.map(({ text }) =>
          text.split('').reduce((lineWidth, char) => lineWidth + getCharacterWidth(char), 0),
        ),
      ) + 52; // Add padding for the indicator and some spacing

    const height = this.options.length * GRID_SIZE + GRID_SIZE; // Each option is 16px tall + some padding

    // Set backdrop size according to its options' size
    this._backdrop.updateSize(width / GRID_SIZE, height / GRID_SIZE);

    // Set the position of the selection box according to options size in relation to canvas width and text box height
    const { canvasWidth, canvasHeight } = Game.getContainerSizes();
    this.position = new Vector2(
      x ?? canvasWidth - width - 32,
      y ?? canvasHeight - height - Game.textBoxBackdropHeight * GRID_SIZE - 4,
    );
  }

  override step(_delta: number, root: Main): void {
    const { input } = root;

    const isOptionSelected = input.getActionJustPressed('Space') || input.getActionJustPressed('Enter');
    const isArrowUpPressed = input.getActionJustPressed('ArrowUp') || input.getActionJustPressed('KeyW');
    const isArrowDownPressed = input.getActionJustPressed('ArrowDown') || input.getActionJustPressed('KeyS');

    if (isOptionSelected) {
      // Emit selected option
      this.emitSelection();
    } else if (isArrowUpPressed) {
      // Move arrow up
      this.currentOptionIndex = (this.currentOptionIndex - 1 + this.options.length) % this.options.length;
    } else if (isArrowDownPressed) {
      // Move arrow down
      this.currentOptionIndex = (this.currentOptionIndex + 1) % this.options.length;
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator
    this._indicator.drawImage(ctx, drawPosX + 4, drawPosY + 9 + this.currentOptionIndex * GRID_SIZE);

    // Draw options text lines
    this._optionsLines.forEach(({ words }, index) => {
      let cursorX = drawPosX + 18;
      const cursorY = drawPosY + index * GRID_SIZE + 9;

      words.forEach(({ chars }) => {
        // Draw this whole segment of text
        chars.forEach((char) => {
          const { sprite, width } = char;
          const widthCharOffset = cursorX - 5;
          sprite.draw(ctx, widthCharOffset, cursorY);

          // Add width of the character we just printed to cursor pos
          cursorX += width;

          // Plus 1px between character
          cursorX += 1;
        });

        // Move the cursor over
        cursorX += 3;
      });
    });
  }

  protected emitSelection(): void {
    Events.emit<SelectionOption>(SELECTION_BOX_CLOSED, this.options[this.currentOptionIndex]);
  }
}
