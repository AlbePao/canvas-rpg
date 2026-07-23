import { Events } from '../../lib/Events';
import { Game, GRID_SIZE, toGridSize } from '../../lib/Game';
import { Inventory } from '../../lib/Inventory';
import { MENU_SCREEN_CLOSE, MenuScreen } from '../../lib/MenuScreen';
import type { Line } from '../../lib/Text';
import { createSpriteTextLines, drawTextLine } from '../../lib/Text';
import {
  SELECTION_BOX_CLOSE,
  SELECTION_BOX_OPEN,
  SELECTION_INDICATOR_OFFSET,
  SELECTION_INDICATOR_X_OFFSET,
  SELECTION_INDICATOR_Y_OFFSET,
  SelectionBox,
  type SelectionOption,
} from '../SelectionBox';
import type { InventoryItem, InventoryItemActionsValue } from './inventoryScreen.types';

const VISIBLE_ITEMS = 8;
const GO_BACK_KEY = 'goBack';

export class InventoryScreen extends MenuScreen {
  private _itemsList: InventoryItem[] = [];
  private _itemsListLines: Line[] = [];
  private _currentIndex = 0;
  // Handles the index of the first visible element in the viewport
  private _scrollOffset = 0;

  private _isIndicatorLocked = false;

  constructor() {
    super({
      id: 'inventory',
    });

    // Generate and sync items list and lines with the current inventory state
    this._generateItemsList();
  }

  override ready(): void {
    Events.on(SELECTION_BOX_OPEN, this, () => {
      this.lockIndicator();

      const endingSub = Events.on<SelectionOption<InventoryItemActionsValue>>(SELECTION_BOX_CLOSE, this, ({ key }) => {
        if (key === 'useItem') {
          console.log('use item...');
        } else if (key === 'throwItem') {
          const currentItemKey = this._itemsList[this._currentIndex].key;
          const itemKey = Inventory.getAll().find(({ itemKey }) => itemKey === currentItemKey)?.itemKey ?? null;

          Inventory.remove(itemKey);

          // Regenerate synced items list and lines with the new inventory state
          this._generateItemsList();
        }

        this.unlockIndicator();
        Events.off(endingSub);
      });
    });
  }

  override step(_delta: number): void {
    if (this._isIndicatorLocked) {
      return;
    }

    const {
      input: { getActionJustPressed },
    } = Game;

    // Close screen if player presses Q key while it's open
    if (getActionJustPressed('KeyQ')) {
      Events.emit(MENU_SCREEN_CLOSE);
      return;
    }

    if (getActionJustPressed('Space') || getActionJustPressed('Enter')) {
      // Open selected item handler
      this.onItemSelect();
    } else if (getActionJustPressed('ArrowUp') || getActionJustPressed('KeyW')) {
      // Move arrow up
      this._currentIndex = (this._currentIndex - 1 + this._itemsList.length) % this._itemsList.length;
      this._updateScrollOffset();
    } else if (getActionJustPressed('ArrowDown') || getActionJustPressed('KeyS')) {
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
      // Close screen option
      { key: GO_BACK_KEY, text: 'Go back', quantity: 0 },
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
    // Draw the backdrop for max 8 elements
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator to the relative index to the visible viewport
    const relativeIndex = this._currentIndex - this._scrollOffset;
    this.indicator.drawImage(
      ctx,
      drawPosX + SELECTION_INDICATOR_OFFSET,
      drawPosY + SELECTION_INDICATOR_Y_OFFSET + toGridSize(relativeIndex),
    );

    // Draw visible options text lines
    const visibleLines = this._itemsListLines.slice(this._scrollOffset, this._scrollOffset + VISIBLE_ITEMS);

    visibleLines.forEach(({ words }, index) => {
      const cursorX = drawPosX + SELECTION_INDICATOR_X_OFFSET;
      // Use renderIndex instead of absolute index to position correctly inside the box
      const cursorY = drawPosY + toGridSize(index) + SELECTION_INDICATOR_Y_OFFSET;

      // TODO: draw item icon and quantity next to the text
      drawTextLine(ctx, words, cursorX, cursorY);
    });
  }

  protected onItemSelect(): void {
    const { key } = this._itemsList[this._currentIndex];

    // Close screen if player selects Go Back option
    if (key === GO_BACK_KEY) {
      Events.emit(MENU_SCREEN_CLOSE);
      return;
    }

    const itemHandlingBox = new SelectionBox<InventoryItemActionsValue>({
      id: `selection-box-for-${this.id}`,
      x: 0,
      y: 0,
      options: [
        { key: 'useItem', text: 'Use' },
        { key: 'throwItem', text: 'Throw' },
        { key: 'cancel', text: 'Cancel' },
      ],
    });

    // Open item handling selection box
    Events.emit<SelectionBox>(SELECTION_BOX_OPEN, itemHandlingBox);

    // Change selection box position to be next to the screen
    itemHandlingBox.position.x = this.position.x + GRID_SIZE;
    itemHandlingBox.position.y = this.position.y + toGridSize(this._currentIndex); // Add 10px padding to align with the text
  }

  protected lockIndicator(): void {
    this._isIndicatorLocked = true;
  }

  protected unlockIndicator(): void {
    this._isIndicatorLocked = false;
  }
}
