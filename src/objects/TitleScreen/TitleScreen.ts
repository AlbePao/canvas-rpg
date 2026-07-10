import { Events } from '../../lib/Events';
import { fromGridSize, Game, GRID_SIZE } from '../../lib/Game';
import { Inventory } from '../../lib/Inventory';
import { LevelBuilder, type LevelBuilderConfig } from '../../lib/LevelBuilder';
import { LevelStateManager } from '../../lib/LevelStateManager';
import { Progress, type ProgressData } from '../../lib/Progress';
import { ScreenTransition } from '../../lib/ScreenTransition';
import { StoryFlags } from '../../lib/StoryFlags';
import { calculateTextWidth } from '../../lib/Text';
import { CHANGE_LEVEL } from '../Level';
import { SelectionBox } from '../SelectionBox';
import type { TitleScreenOption, TitleScreenOptionValue } from './titleScreen.types';

export class TitleScreen extends SelectionBox<TitleScreenOptionValue> {
  private readonly _saveFile: ProgressData | null = null;

  constructor() {
    const { saveFile } = Progress;
    const { canvasWidth, canvasHeight } = Game.containerSizes;

    const options: TitleScreenOption[] = [
      saveFile ? { key: 'loadGame', text: 'Load Game' } : null,
      { key: 'newGame', text: 'New Game' },
    ].filter((option): option is TitleScreenOption => !!option);

    const width = Math.max(...options.map(({ text }) => calculateTextWidth(text)));
    const height = options.length + GRID_SIZE;

    super({
      id: 'title-screen',
      options,
      x: fromGridSize(canvasWidth / 2 - width),
      y: fromGridSize(canvasHeight / 2 - height),
    });

    this._saveFile = saveFile;
  }

  protected override onOptionSelect(): void {
    const { key } = this.options[this.currentOptionIndex];

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

    for (const flag of storyFlags) {
      StoryFlags.add(flag);
    }

    for (const { itemKey } of inventory) {
      Inventory.add(itemKey);
    }

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
