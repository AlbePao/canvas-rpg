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
import type { Line } from '../../lib/Text';
import { calculateTextWidth, createSpriteTextLines, drawTextLine } from '../../lib/Text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import { PAUSE_SUB_MENU_CLOSE } from '../PauseMenu';
import { SETTINGS_MENU_ITEMS } from './settingsMenu.constants';

export class SettingsMenu extends GameObject {
  private readonly _settingsList = SETTINGS_MENU_ITEMS;
  private readonly _settingsListLines: Line[] = [];
  private readonly _optionsTextCache: Record<string, Line> = {};
  private _currentIndex = 0;
  private readonly _width: number;
  private readonly _longestOptionTextWidth: number;

  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-settings-box-backdrop`,
    width: 0,
    height: 0,
  });
  private readonly _indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'RIGHT',
  });
  private readonly _leftArrow = new ArrowIndicator({
    id: 'settings-left-arrow',
    direction: 'LEFT',
  });
  private readonly _rightArrow = new ArrowIndicator({
    id: 'settings-right-arrow',
    direction: 'RIGHT',
  });

  constructor() {
    // The x and y position are related to PauseMenu position
    super({
      id: 'settings-box',
      x: 1,
      y: 1,
    });

    // Draw on top layer
    this.drawLayer = 'HUD';

    this._settingsListLines = createSpriteTextLines(
      this._settingsList.map(({ text }) => text),
      this.id,
    );

    let maxOptionWidth = 0;

    for (const { key, options } of this._settingsList.filter(({ key }) => key !== 'goBack')) {
      options.forEach((opt, idx) => {
        const lines = createSpriteTextLines([opt.text], key);
        this._optionsTextCache[`${key}_${idx}`] = lines[0];
      });

      const longestForSetting = options.reduce((max, { text }) => Math.max(max, calculateTextWidth(text)), 0) + 5;

      maxOptionWidth = Math.max(maxOptionWidth, longestForSetting);
    }

    this._longestOptionTextWidth = maxOptionWidth;

    // Calculate menu width and add padding for the indicator, the longest option text, and some spacing
    this._width =
      Math.max(...this._settingsList.map(({ text }) => calculateTextWidth(text))) + this._longestOptionTextWidth + 128;

    const height = toGridSize(this._settingsList.length) + GRID_SIZE; // Each option is 16px tall + some padding

    // Set backdrop size according to its item text size
    this._backdrop.updateSize(this._width / GRID_SIZE, height / GRID_SIZE);
  }

  override step(_delta: number): void {
    const {
      input: { getActionJustPressed },
    } = Game;
    const { key } = this._settingsList[this._currentIndex];

    const isCloseAction =
      getActionJustPressed('KeyQ') ||
      ((getActionJustPressed('Space') || getActionJustPressed('Enter')) && key === 'goBack');

    // Close menu if player presses Q key or selects "go back" while it's open
    if (isCloseAction) {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
      return;
    }

    if (getActionJustPressed('ArrowUp') || getActionJustPressed('KeyW')) {
      // Move arrow up
      this._currentIndex = (this._currentIndex - 1 + this._settingsList.length) % this._settingsList.length;
    } else if (getActionJustPressed('ArrowDown') || getActionJustPressed('KeyS')) {
      // Move arrow down
      this._currentIndex = (this._currentIndex + 1) % this._settingsList.length;
    } else if (getActionJustPressed('ArrowLeft') || getActionJustPressed('KeyA')) {
      // Set left setting option
      this._changeOption(-1);
    } else if (getActionJustPressed('ArrowRight') || getActionJustPressed('KeyD')) {
      // Set right setting option
      this._changeOption(1);
    }
  }

  private _changeOption(direction: -1 | 1): void {
    const currentSetting = this._settingsList[this._currentIndex];
    const { key, selectedIndex, options } = currentSetting;

    if (key === 'goBack') {
      return;
    }

    currentSetting.selectedIndex = (selectedIndex + direction + options.length) % options.length;
    const { value } = options[currentSetting.selectedIndex];
    Game.updateSetting(key, value);
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator
    this._indicator.drawImage(
      ctx,
      drawPosX + SELECTION_INDICATOR_OFFSET,
      drawPosY + SELECTION_INDICATOR_Y_OFFSET + toGridSize(this._currentIndex),
    );

    // Draw options text lines
    this._settingsListLines.forEach((line, index) => {
      const cursorY = drawPosY + toGridSize(index) + SELECTION_INDICATOR_Y_OFFSET;

      drawTextLine(ctx, line.words, drawPosX + SELECTION_INDICATOR_X_OFFSET, cursorY);

      const { key, selectedIndex } = this._settingsList[index];

      if (key === 'goBack') {
        return;
      }

      // Where to draw the left arrow for the current option
      let optionX = drawPosX + this._width - this._longestOptionTextWidth - 64;

      if (index === this._currentIndex) {
        // Draw left arrow for the current selected option
        this._leftArrow.drawImage(ctx, optionX, cursorY);
      }

      // Now draw the current selected option value for this setting item
      optionX += SELECTION_INDICATOR_X_OFFSET;
      const { words } = this._optionsTextCache[`${key}_${selectedIndex}`];
      const optionTextWidth = drawTextLine(ctx, words, optionX, cursorY);
      optionX += optionTextWidth + SELECTION_INDICATOR_X_OFFSET;

      if (index === this._currentIndex) {
        // Where to draw the right arrow for the current option
        const rightArrowX = optionX + this._longestOptionTextWidth - optionTextWidth;
        this._rightArrow.drawImage(ctx, rightArrowX, cursorY);
      }
    });
  }
}
