import { createSpriteTextLines, getCharacterWidth } from '../../helpers/spriteText';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Inventory, type InventoryItem } from '../../lib/Inventory';
import type { Line } from '../../types/text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import type { Main } from '../Main';
import { PAUSE_SUB_MENU_CLOSE } from '../PauseMenu';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, SelectionBox, type SelectionOption } from '../SelectionBox';

export class InventoryMenu extends GameObject {
  protected readonly items: InventoryItem[];
  protected currentItemIndex = 0;
  protected readonly itemsLines: Line[];

  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-inventory-box-backdrop`,
    width: 0,
    height: 0,
  });
  protected readonly indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'RIGHT',
  });

  private _isIndicatorLocked = false;

  constructor() {
    super({
      id: 'inventory-box',
      x: 6,
      y: 0,
    });

    this.items = Inventory.getAll();

    const { toGridSize, gridSize } = Game;

    // Draw on top layer
    this.drawLayer = 'HUD';

    this.itemsLines = createSpriteTextLines(
      this.items.map(({ name }) => name),
      this.id,
    );

    const width =
      Math.max(
        ...this.items.map(({ name }) =>
          name.split('').reduce((lineWidth, char) => lineWidth + getCharacterWidth(char), 0),
        ),
      ) + 76; // Add padding for the indicator and some spacing

    const height = toGridSize(this.items.length) + gridSize; // Each option is 16px tall + some padding

    // Set backdrop size according to its item text size
    this._backdrop.updateSize(width / gridSize, height / gridSize);
  }

  override ready(): void {
    Events.on(SELECTION_BOX_OPEN, this, () => {
      this.lockIndicator();
    });

    Events.on<SelectionOption>(SELECTION_BOX_CLOSE, this, ({ value }) => {
      this.unlockIndicator();

      if (value !== 'cancel') {
        console.log('do something...');
      }
    });
  }

  override step(_delta: number, root: Main): void {
    if (this._isIndicatorLocked) {
      return;
    }

    const { input } = root;

    // Close inventory menu if user presses esc while it's open
    if (input.getActionJustPressed('ArrowLeft') || input.getActionJustPressed('KeyA')) {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
    }
    const isItemSelected = input.getActionJustPressed('Space') || input.getActionJustPressed('Enter');
    const isArrowUpPressed = input.getActionJustPressed('ArrowUp') || input.getActionJustPressed('KeyW');
    const isArrowDownPressed = input.getActionJustPressed('ArrowDown') || input.getActionJustPressed('KeyS');

    if (isItemSelected) {
      // Open selected item handler
      this.onItemSelect();
    } else if (isArrowUpPressed) {
      // Move arrow up
      this.currentItemIndex = (this.currentItemIndex - 1 + this.items.length) % this.items.length;
    } else if (isArrowDownPressed) {
      // Move arrow down
      this.currentItemIndex = (this.currentItemIndex + 1) % this.items.length;
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    const { toGridSize } = Game;

    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator
    this.indicator.drawImage(ctx, drawPosX + 4, drawPosY + 10 + toGridSize(this.currentItemIndex));

    // Draw options text lines
    this.itemsLines.forEach(({ words }, index) => {
      let cursorX = drawPosX + 18;
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

  protected onItemSelect(): void {
    Events.emit<SelectionBox>(
      SELECTION_BOX_OPEN,
      new SelectionBox({
        id: `selection-box-for-${this.id}`,
        options: [
          { text: 'Use', value: 'use_item' },
          { text: 'Throw', value: 'throw_item' },
          { text: 'Cancel', value: 'cancel' },
        ],
      }),
    );
  }

  protected lockIndicator(): void {
    this._isIndicatorLocked = true;
  }

  protected unlockIndicator(): void {
    this._isIndicatorLocked = false;
  }
}
