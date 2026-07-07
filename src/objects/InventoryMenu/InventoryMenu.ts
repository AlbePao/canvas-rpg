import { calculateTextWidth, createSpriteTextLines } from '../../helpers/spriteText';
import { Events } from '../../lib/Events';
import { Game, toGridSize } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Inventory } from '../../lib/Inventory';
import type { Line } from '../../types/text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import { PAUSE_SUB_MENU_CLOSE } from '../PauseMenu';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, SelectionBox, type SelectionOption } from '../SelectionBox';
import type { InventoryItem } from './inventoryMenu.types';

const VISIBLE_ITEMS = 8;

// TODO: evaluate to move this class to a different screen instead of a sub menu, so selection box can be opened without setting its position and items icon and quantity can be drawn next to the text without recalculating space
export class InventoryMenu extends GameObject {
  private _itemsList: InventoryItem[] = [];
  private _itemsListLines: Line[] = [];
  private _currentIndex = 0;
  // Handles the index of the first visible element in the viewport
  private _scrollOffset = 0;
  private readonly _width: number;
  private readonly _height: number;

  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-inventory-box-backdrop`,
    width: 0,
    height: 0,
  });
  private readonly _indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'RIGHT',
  });

  private _isIndicatorLocked = false;

  constructor() {
    // The x and y position are related to PauseMenu position
    super({
      id: 'inventory-box',
      x: 6,
      y: 0,
    });

    const { gridSize } = Game;

    // Draw on top layer
    this.drawLayer = 'HUD';

    // Generate and sync items list and lines with the current inventory state
    this._generateItemsList();

    // Calculate inventory menu width and add padding for the indicator and some spacing
    this._width = Math.max(...this._itemsList.map(({ text }) => calculateTextWidth(text))) + 76;

    const actualVisibleCount = Math.min(this._itemsList.length, VISIBLE_ITEMS);
    this._height = toGridSize(actualVisibleCount) + gridSize; // Each option is 16px tall + some padding

    // Set backdrop size according to its item text size
    this._backdrop.updateSize(this._width / gridSize, this._height / gridSize);
  }

  override ready(): void {
    Events.on(SELECTION_BOX_OPEN, this, () => {
      this.lockIndicator();
    });

    Events.on<SelectionOption>(SELECTION_BOX_CLOSE, this, ({ key }) => {
      if (key === 'use_item') {
        console.log('use item...');
      } else if (key === 'throw_item') {
        const currentItemKey = this._itemsList[this._currentIndex].key;
        const itemKey = Inventory.getAll().find(({ itemKey }) => itemKey === currentItemKey)?.itemKey ?? null;

        Inventory.remove(itemKey);

        // Regenerate synced items list and lines with the new inventory state
        this._generateItemsList();
      }

      this.unlockIndicator();
    });
  }

  override step(_delta: number): void {
    if (this._isIndicatorLocked) {
      return;
    }

    const {
      input: { getActionJustPressed },
    } = Game;
    const isQKeyPressed = getActionJustPressed('KeyQ');

    // Close menu if player presses Q key while it's open
    if (isQKeyPressed) {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
      return;
    }

    const isSelected = getActionJustPressed('Space') || getActionJustPressed('Enter');
    const isArrowUpPressed = getActionJustPressed('ArrowUp') || getActionJustPressed('KeyW');
    const isArrowDownPressed = getActionJustPressed('ArrowDown') || getActionJustPressed('KeyS');

    if (isSelected) {
      // Open selected item handler
      this.onItemSelect();
    } else if (isArrowUpPressed) {
      // Move arrow up
      this._currentIndex = (this._currentIndex - 1 + this._itemsList.length) % this._itemsList.length;
      this._updateScrollOffset();
    } else if (isArrowDownPressed) {
      // Move arrow down
      this._currentIndex = (this._currentIndex + 1) % this._itemsList.length;
      this._updateScrollOffset();
    }
  }

  private _generateItemsList(): void {
    this._itemsList = [
      ...Inventory.getAll().map(({ itemKey, name, quantity }) => ({
        key: itemKey,
        text: name,
        quantity,
      })),
      // Close menu option
      { key: 'goBack', text: 'Go back', quantity: 0 },
    ];

    this._itemsListLines = createSpriteTextLines(
      this._itemsList.map(({ text }) => text),
      this.id,
    );
  }

  // Update scroll shift
  private _updateScrollOffset(): void {
    const maxScrollOffset = Math.max(0, this._itemsList.length - VISIBLE_ITEMS);
    const relativeIndex = this._currentIndex - this._scrollOffset;

    /**
     * If the relative index reaches or exceeds the last visible slot (VISIBLE_ITEMS - 1), force
     * the scrollOffset to move to put the cursor back on the second-to-last slot (VISIBLE_ITEMS - 2)
     */
    if (relativeIndex >= VISIBLE_ITEMS - 1) {
      this._scrollOffset = this._currentIndex - VISIBLE_ITEMS + 2;
    }

    /**
     * To ensure the same visual cleanliness when going up, go down with the
     * offset if touch the first slot (relativeIndex 0), keeping the cursor on the second slot (relativeIndex 1)
     */
    if (relativeIndex <= 0 && this._currentIndex > 0) {
      this._scrollOffset = this._currentIndex - 1;
    }

    // Head-to-tail jump
    if (this._currentIndex < this._scrollOffset) {
      this._scrollOffset = this._currentIndex;
    }

    // Apply physical limits: the offset cannot be negative nor exceed the maximum possible
    this._scrollOffset = Math.max(0, Math.min(this._scrollOffset, maxScrollOffset));
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    const Y_OFFSET = 10;

    // Draw the backdrop for max 8 elements
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator to the relative index to the visible viewport
    const relativeIndex = this._currentIndex - this._scrollOffset;
    this._indicator.drawImage(ctx, drawPosX + 4, drawPosY + Y_OFFSET + toGridSize(relativeIndex));

    // Draw visible options text lines
    const visibleLines = this._itemsListLines.slice(this._scrollOffset, this._scrollOffset + VISIBLE_ITEMS);

    visibleLines.forEach(({ words }, renderIndex) => {
      let cursorX = drawPosX + 18;
      // Use renderIndex instead of absolute index to position correctly inside the box
      const cursorY = drawPosY + toGridSize(renderIndex) + Y_OFFSET;

      // TODO: draw item icon and quantity next to the text
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

  protected onItemSelect(): void {
    const { key } = this._itemsList[this._currentIndex];

    // Close menu if player selects Go Back option
    if (key === 'goBack') {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
      return;
    }

    const itemHandlingBox = new SelectionBox({
      id: `selection-box-for-${this.id}`,
      x: this._width / 16,
      y: 0,
      options: [
        { key: 'useItem', text: 'Use' },
        { key: 'throwItem', text: 'Throw' },
        { key: 'cancel', text: 'Cancel' },
      ],
    });

    // Open item handling selection box
    Events.emit<SelectionBox>(SELECTION_BOX_OPEN, itemHandlingBox);

    // Change selection box position to be next to the menu
    itemHandlingBox.position.x = this.position.x + 16;
    itemHandlingBox.position.y = this.position.y + toGridSize(this._currentIndex); // Add 10px padding to align with the text
  }

  protected lockIndicator(): void {
    this._isIndicatorLocked = true;
  }

  protected unlockIndicator(): void {
    this._isIndicatorLocked = false;
  }
}
