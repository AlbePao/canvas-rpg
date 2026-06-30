import { createSpriteTextLines, getCharacterWidth } from '../../helpers/spriteText';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Inventory } from '../../lib/Inventory';
import type { Line } from '../../types/text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import type { Main } from '../Main';
import { PAUSE_SUB_MENU_CLOSE } from '../PauseMenu';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, SelectionBox, type SelectionOption } from '../SelectionBox';
import type { ListItem } from './inventoryMenu.types';

const VISIBLE_ITEMS = 8;

export class InventoryMenu extends GameObject {
  private readonly _items = Inventory.getAll();
  protected readonly itemsList: ListItem[] = [
    ...this._items.map(({ itemKey, name }) => ({
      value: itemKey,
      text: name,
      quantity: Inventory.get(itemKey)?.quantity ?? 0,
    })),
    // Fake item to handle inventory menu close
    { value: 'go_back', text: 'Go back', quantity: 0 },
  ];
  protected currentIndex = 0;
  // Gestisce l'indice del primo elemento visibile nel viewport
  private _scrollOffset = 0;
  protected readonly itemsListLines: Line[];

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
    // The x and y position are related to PauseMenu position
    super({
      id: 'inventory-box',
      x: 6,
      y: 0,
    });

    const { toGridSize, gridSize } = Game;

    // Draw on top layer
    this.drawLayer = 'HUD';

    this.itemsListLines = createSpriteTextLines(
      this.itemsList.map(({ text }) => text),
      this.id,
    );

    const width =
      Math.max(
        ...this.itemsList.map(({ text }) =>
          text.split('').reduce((lineWidth, char) => lineWidth + getCharacterWidth(char), 0),
        ),
      ) + 76; // Add padding for the indicator and some spacing

    // BEST PRACTICE: L'altezza deve basarsi sul numero MINIMO tra gli elementi totali e quelli visibili.
    // Evita che il box sia gigante se hai solo 2 oggetti.
    const actualVisibleCount = Math.min(this.itemsList.length, VISIBLE_ITEMS);
    const height = toGridSize(actualVisibleCount) + gridSize; // Each option is 16px tall + some padding

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
    const isLeftArrowPressed = input.getActionJustPressed('ArrowLeft') || input.getActionJustPressed('KeyA');

    // Close inventory menu if player presses left arrow keys while it's open
    if (isLeftArrowPressed) {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
      return;
    }

    const isSelected = input.getActionJustPressed('Space') || input.getActionJustPressed('Enter');
    const isArrowUpPressed = input.getActionJustPressed('ArrowUp') || input.getActionJustPressed('KeyW');
    const isArrowDownPressed = input.getActionJustPressed('ArrowDown') || input.getActionJustPressed('KeyS');

    if (isSelected) {
      // Open selected item handler
      this.onItemSelect();
    } else if (isArrowUpPressed) {
      // Move arrow up
      this.currentIndex = (this.currentIndex - 1 + this.itemsList.length) % this.itemsList.length;
      this._updateScrollOffset();
    } else if (isArrowDownPressed) {
      // Move arrow down
      this.currentIndex = (this.currentIndex + 1) % this.itemsList.length;
      this._updateScrollOffset();
    }
  }

  // Update scroll shift
  private _updateScrollOffset(): void {
    if (this.currentIndex < this._scrollOffset) {
      // If current index has gone above the start of the viewport
      this._scrollOffset = this.currentIndex;
    } else if (this.currentIndex >= this._scrollOffset + VISIBLE_ITEMS) {
      // If current index has gone below the start of the viewport
      this._scrollOffset = this.currentIndex - VISIBLE_ITEMS + 1;
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    const { toGridSize } = Game;

    // Draw the backdrop for max 8 elements
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the indicator to the relative index to the visible viewport
    const relativeIndex = this.currentIndex - this._scrollOffset;
    this.indicator.drawImage(ctx, drawPosX + 4, drawPosY + 10 + toGridSize(relativeIndex));

    // Draw visible options text lines
    const visibleLines = this.itemsListLines.slice(this._scrollOffset, this._scrollOffset + VISIBLE_ITEMS);

    visibleLines.forEach(({ words }, renderIndex) => {
      let cursorX = drawPosX + 18;
      // Use renderIndex instead of absolute index to position correctly inside the box
      const cursorY = drawPosY + toGridSize(renderIndex) + 10;

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
    const { value } = this.itemsList[this.currentIndex];

    // Close menu if player selects Go Back option
    if (value === 'go_back') {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
      return;
    }

    // Open item handling selection box
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
