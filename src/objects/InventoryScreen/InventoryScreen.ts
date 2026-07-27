import { Events } from '../../lib/Events';
import { GRID_SIZE, toGridSize } from '../../lib/Game';
import { userPressDirectionKeys, userPressEnterKeys, userPressExitKeys } from '../../lib/Input';
import { Inventory } from '../../lib/Inventory';
import type { Line } from '../../lib/Text';
import { createSpriteTextLines, drawTextLine } from '../../lib/Text';
import { MenuScreen } from '../MenuScreen';
import { MENU_SCREEN_GO_BACK_KEY } from '../MenuScreen/menuScreen.constants';
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

export class InventoryScreen extends MenuScreen<InventoryItem> {
  private _listLines: Line[] = [];

  constructor() {
    super({
      id: 'inventory',
      closeTransition: 'fadeBlack',
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
          Inventory.remove(this.itemsList[this.currentIndex].key);

          // Regenerate synced items list and lines with the new inventory state
          this._generateItemsList();
        }

        this.unlockIndicator();
        Events.off(endingSub);
      });
    });
  }

  override step(_delta: number): void {
    if (this.isIndicatorLocked) {
      return;
    }

    // Close screen if player presses Q key while it's open
    if (userPressExitKeys()) {
      this.close();
      return;
    }

    if (userPressEnterKeys()) {
      // Open selected item handler
      this.onItemSelect();
    } else if (userPressDirectionKeys('up')) {
      // Move arrow up
      this.currentIndex = (this.currentIndex - 1 + this.itemsList.length) % this.itemsList.length;
      this.updateScrollOffset();
    } else if (userPressDirectionKeys('down')) {
      // Move arrow down
      this.currentIndex = (this.currentIndex + 1) % this.itemsList.length;
      this.updateScrollOffset();
    }
  }

  private _generateItemsList(): void {
    this.itemsList = [
      ...Inventory.getAll().map(({ itemKey, name, quantity }) => ({
        key: itemKey,
        text: name,
        quantity,
      })),
      // Close screen option
      { key: MENU_SCREEN_GO_BACK_KEY, text: 'Go back', quantity: 0 },
    ];

    this._listLines = createSpriteTextLines(
      this.itemsList.map(({ text }) => text),
      this.id,
    );
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop for max 8 elements
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator to the relative index to the visible viewport
    const relativeIndex = this.currentIndex - this.scrollOffset;
    this.indicator.drawImage(
      ctx,
      drawPosX + SELECTION_INDICATOR_OFFSET,
      drawPosY + SELECTION_INDICATOR_Y_OFFSET + toGridSize(relativeIndex),
    );

    // Draw visible options text lines
    const visibleLines = this._listLines.slice(this.scrollOffset, this.scrollOffset + this.visibleItems);

    visibleLines.forEach(({ words }, index) => {
      const cursorX = drawPosX + SELECTION_INDICATOR_X_OFFSET;
      // Use renderIndex instead of absolute index to position correctly inside the box
      const cursorY = drawPosY + toGridSize(index) + SELECTION_INDICATOR_Y_OFFSET;

      // TODO: draw item icon and quantity next to the text
      drawTextLine(ctx, words, cursorX, cursorY);
    });
  }

  protected override onItemSelect(): void {
    const { key } = this.itemsList[this.currentIndex];

    // Close screen if player selects Go Back option
    if (key === MENU_SCREEN_GO_BACK_KEY) {
      this.close();
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
    itemHandlingBox.position.y = this.position.y + toGridSize(this.currentIndex); // Add 10px padding to align with the text
  }
}
