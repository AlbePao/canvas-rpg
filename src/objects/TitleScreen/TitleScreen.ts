import { Events } from '../../lib/Events';
import {
  Game,
  GRID_SIZE,
  SELECTION_INDICATOR_OFFSET,
  SELECTION_INDICATOR_X_OFFSET,
  SELECTION_INDICATOR_Y_OFFSET,
  toGridSize,
} from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Inventory } from '../../lib/Inventory';
import { LevelBuilder, type LevelBuilderConfig } from '../../lib/LevelBuilder';
import { LevelStateManager } from '../../lib/LevelStateManager';
import { Progress } from '../../lib/Progress';
import { ScreenTransition } from '../../lib/ScreenTransition';
import { StoryFlags } from '../../lib/StoryFlags';
import type { Line } from '../../lib/Text';
import { createSpriteTextLines } from '../../lib/Text';
import { Vector2 } from '../../lib/Vector2';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import { CHANGE_LEVEL } from '../Level';
import type { TitleScreenOption } from './titleScreen.types';

export class TitleScreen extends GameObject {
  private readonly _saveFile = Progress.saveFile;
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

  constructor() {
    super({
      id: 'title-screen',
    });

    // Draw on top layer
    this.drawLayer = 'HUD';

    this._options = [
      this._saveFile ? { key: 'loadGame', text: 'Load Game' } : null,
      { key: 'newGame', text: 'New Game' },
    ].filter((option): option is TitleScreenOption => !!option);

    this._optionsLines = createSpriteTextLines(
      this._options.map(({ text }) => text),
      this.id,
    );

    const width = 5.5;
    const height = this._options.length + 1;

    // Set backdrop size according to its options' size
    this._backdrop.updateSize(width, height);

    // Set the position according to options size in relation to canvas width and text box height
    const { containerSizes } = Game;
    const { canvasWidth, canvasHeight } = containerSizes;
    const newX = (canvasWidth - width * GRID_SIZE) / 2;
    const newY = (canvasHeight - height * GRID_SIZE) / 2;
    this.position = new Vector2(newX, newY);
  }

  override step(_delta: number): void {
    const {
      input: { getActionJustPressed },
    } = Game;

    const isOptionSelected = getActionJustPressed('Space') || getActionJustPressed('Enter');
    const isArrowUpPressed = getActionJustPressed('ArrowUp') || getActionJustPressed('KeyW');
    const isArrowDownPressed = getActionJustPressed('ArrowDown') || getActionJustPressed('KeyS');

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
    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator
    this._indicator.drawImage(
      ctx,
      drawPosX + SELECTION_INDICATOR_OFFSET,
      drawPosY + SELECTION_INDICATOR_Y_OFFSET + toGridSize(this._currentOptionIndex),
    );

    // Draw options text lines
    this._optionsLines.forEach(({ words }, index) => {
      let cursorX = drawPosX + SELECTION_INDICATOR_X_OFFSET;
      const cursorY = drawPosY + toGridSize(index) + SELECTION_INDICATOR_Y_OFFSET;

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

  private _onOptionSelect(): void {
    const { key } = this._options[this._currentOptionIndex];

    if (key === 'loadGame') {
      this._loadGame();
      return;
    }

    this._startGame({ id: 'tilesetLevel' });
  }

  private _loadGame(): void {
    if (!this._saveFile) {
      return;
    }

    const {
      levelId,
      storyFlags,
      levelsState,
      hero: { position, inventory },
    } = this._saveFile;

    LevelStateManager.state = levelsState;

    storyFlags.forEach((flag) => {
      StoryFlags.add(flag);
    });

    inventory.forEach(({ itemKey }) => {
      Inventory.add(itemKey);
    });

    this._startGame({
      id: levelId,
      heroStartPosition: position,
    });
  }

  private _startGame(config: LevelBuilderConfig): void {
    new ScreenTransition(
      () => {
        Events.emit<LevelBuilder>(CHANGE_LEVEL, new LevelBuilder(config));
        this.destroy();
      },
      { transition: 'fadeBlack' },
    );
  }
}
