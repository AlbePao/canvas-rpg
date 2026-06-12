import { createSpriteTextLines } from '../../helpers/spriteText';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { LevelBuilder, type LevelBuilderConfig } from '../../lib/LevelBuilder';
import { ScreenTransition } from '../../lib/ScreenTransition';
import { Vector2 } from '../../lib/Vector2';
import type { Line } from '../../types/text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import { CHANGE_LEVEL } from '../Level';
import type { Main } from '../Main';
import type { TitleScreenConfig, TitleScreenOption } from './titleScreen.types';

export class TitleScreen extends GameObject {
  private readonly _saveFile: unknown;
  private readonly _options: TitleScreenOption[];
  private _currentOptionIndex = 0;
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

  constructor(config: TitleScreenConfig) {
    super({
      id: 'title-screen',
    });

    const { saveFile } = config;

    // Draw on top layer
    this.drawLayer = 'HUD';

    this._saveFile = saveFile;
    this._options = [
      this._saveFile ? { text: 'Load Game', value: 'load_game' } : null,
      { text: 'New Game', value: 'new_game' },
      { text: 'Options', value: 'options' },
    ].filter((option) => !!option);

    const gridSize = Game.getGridSize();

    this._optionsLines = createSpriteTextLines(
      this._options.map(({ text }) => text),
      `${this.id}`,
    );

    const width = 5;
    const height = this._options.length + 1;

    // Set backdrop size according to its options' size
    this._backdrop.updateSize(width, height);

    // Set the position according to options size in relation to canvas width and text box height
    const { canvasWidth, canvasHeight } = Game.getContainerSizes();
    const newX = (canvasWidth - width * gridSize) / 2;
    const newY = (canvasHeight - height * gridSize) / 2;
    this.position = new Vector2(newX, newY);
  }

  override step(_delta: number, root: Main): void {
    const { input } = root;

    const isOptionSelected = input.getActionJustPressed('Space') || input.getActionJustPressed('Enter');
    const isArrowUpPressed = input.getActionJustPressed('ArrowUp') || input.getActionJustPressed('KeyW');
    const isArrowDownPressed = input.getActionJustPressed('ArrowDown') || input.getActionJustPressed('KeyS');

    if (isOptionSelected) {
      this._onOptionSelect();
    } else if (isArrowUpPressed) {
      // Move arrow up
      this._currentOptionIndex = (this._currentOptionIndex - 1 + this._options.length) % this._options.length;
    } else if (isArrowDownPressed) {
      // Move arrow down
      this._currentOptionIndex = (this._currentOptionIndex + 1) % this._options.length;
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    const { toGridSize } = Game;

    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator
    this._indicator.drawImage(ctx, drawPosX + 6, drawPosY + 10 + toGridSize(this._currentOptionIndex));

    // Draw options text lines
    this._optionsLines.forEach(({ words }, index) => {
      let cursorX = drawPosX + 24;
      const cursorY = drawPosY + toGridSize(index) + 10;

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

  private _onOptionSelect(): void {
    const { value } = this._options[this._currentOptionIndex];

    if (value === 'options') {
      // TODO: open options box
      return;
    }

    if (value === 'load_game') {
      // TODO: load save file data, then load level
      // this._saveFile
      this._loadLevel({ id: 'tilesetLevel' });
      return;
    }

    this._loadLevel({ id: 'tilesetLevel' });
  }

  private _loadLevel(config: LevelBuilderConfig): void {
    new ScreenTransition(
      () => {
        Events.emit<LevelBuilder>(CHANGE_LEVEL, new LevelBuilder(config));
        this.destroy();
      },
      { transition: 'fadeBlack' },
    );
  }
}
