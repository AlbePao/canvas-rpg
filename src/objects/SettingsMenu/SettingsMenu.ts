import { calculateTextWidth, createSpriteTextLines } from '../../helpers/spriteText';
import { Events } from '../../lib/Events';
import { Game, toGridSize } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import type { Line } from '../../types/text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import { PAUSE_SUB_MENU_CLOSE } from '../PauseMenu';
import { SETTINGS_MENU_ITEMS } from './settingsMenu.constants';

export class SettingsMenu extends GameObject {
  private readonly _settingsList = SETTINGS_MENU_ITEMS;
  private readonly _settingsListLines: Line[] = [];
  private _currentIndex = 0;
  private readonly _width: number;
  private readonly _height: number;

  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-settings-box-backdrop`,
    width: 0,
    height: 0,
  });
  private readonly _indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'RIGHT',
  });

  constructor() {
    // The x and y position are related to PauseMenu position
    super({
      id: 'settings-box',
      x: 6,
      y: 0,
    });

    const { gridSize } = Game;

    // Draw on top layer
    this.drawLayer = 'HUD';

    this._settingsListLines = createSpriteTextLines(
      this._settingsList.map(({ text }) => text),
      this.id,
    );

    // Calculate menu width and add padding for the indicator and some spacing
    this._width = Math.max(...this._settingsList.map(({ text }) => calculateTextWidth(text))) + 76;

    this._height = toGridSize(this._settingsList.length) + gridSize; // Each option is 16px tall + some padding

    // Set backdrop size according to its item text size
    this._backdrop.updateSize(this._width / gridSize, this._height / gridSize);
  }

  override step(_delta: number): void {
    const {
      input: { getActionJustPressed },
    } = Game;
    const isQKeyPressed = getActionJustPressed('KeyQ');

    // Close menu if player presses Q key while it's open
    if (isQKeyPressed) {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
      return;
    }

    const isEnterPressed = getActionJustPressed('Space') || getActionJustPressed('Enter');
    const isArrowUpPressed = getActionJustPressed('ArrowUp') || getActionJustPressed('KeyW');
    const isArrowDownPressed = getActionJustPressed('ArrowDown') || getActionJustPressed('KeyS');
    const isArrowLeftPressed = getActionJustPressed('ArrowLeft') || getActionJustPressed('KeyA');
    const isArrowRightPressed = getActionJustPressed('ArrowRight') || getActionJustPressed('KeyD');

    if (isEnterPressed && this._settingsList[this._currentIndex].key === 'goBack') {
      // Close menu if player selects Go Back option
      Events.emit(PAUSE_SUB_MENU_CLOSE);
      return;
    } else if (isArrowUpPressed) {
      // Move arrow up
      this._currentIndex = (this._currentIndex - 1 + this._settingsList.length) % this._settingsList.length;
    } else if (isArrowDownPressed) {
      // Move arrow down
      this._currentIndex = (this._currentIndex + 1) % this._settingsList.length;
    } else if (isArrowLeftPressed) {
      // Set left setting option
      // TODO: add logic
    } else if (isArrowRightPressed) {
      // Set right setting option
      // TODO: add logic
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    const Y_OFFSET = 10;

    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator
    this._indicator.drawImage(ctx, drawPosX + 4, drawPosY + Y_OFFSET + toGridSize(this._currentIndex));

    // Draw options text lines
    this._settingsListLines.forEach(({ words }, index) => {
      let cursorX = drawPosX + 18;
      const cursorY = drawPosY + toGridSize(index) + Y_OFFSET;

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
}
