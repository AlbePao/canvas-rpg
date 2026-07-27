import { Events } from '../../lib/Events';
import { fromGridSize, Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { userPressDirectionKeys, userPressEnterKeys, userPressExitKeys } from '../../lib/Input';
import { ScreenTransition, type ScreenTransitionConfig } from '../../lib/ScreenTransition';
import type { BaseOption } from '../../types/baseOption';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import { MENU_SCREEN_CLOSE, MENU_SCREEN_VISIBLE_ITEMS } from './menuScreen.constants';
import type { MenuScreenConfig } from './menuScreen.types';

export class MenuScreen<T extends BaseOption = BaseOption> extends GameObject {
  protected itemsList: T[] = [];
  protected currentIndex = 0;
  // Handles the index of the first visible element in the viewport
  protected scrollOffset = 0;

  protected readonly visibleItems: number;
  protected isIndicatorLocked = false;

  private readonly _closeTransitionConfig?: ScreenTransitionConfig;
  protected readonly backdrop = new BoxBackdrop({
    id: `${this.id}-inventory-screen-backdrop`,
    width: fromGridSize(Game.containerSizes.canvasWidth),
    height: fromGridSize(Game.containerSizes.canvasHeight),
  });
  protected readonly indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'right',
  });

  constructor(config: MenuScreenConfig) {
    const { id, closeTransition, visibleItems = MENU_SCREEN_VISIBLE_ITEMS } = config;

    super({
      id: `${id}-menu-screen`,
    });

    this.drawLayer = 'hud';
    this.visibleItems = visibleItems;

    if (closeTransition) {
      this._closeTransitionConfig = { transition: closeTransition };
    }
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

  // Update scroll shift
  protected updateScrollOffset(): void {
    const maxScrollOffset = Math.max(0, this.itemsList.length - this.visibleItems);
    const relativeIndex = this.currentIndex - this.scrollOffset;

    /**
     * If the relative index reaches or exceeds the last visible slot (VISIBLE_ITEMS - 1), force
     * the scrollOffset to move to put the cursor back on the second-to-last slot (VISIBLE_ITEMS - 2)
     */
    if (relativeIndex >= this.visibleItems - 1) {
      this.scrollOffset = this.currentIndex - this.visibleItems + 2;
    }

    /**
     * To ensure the same visual cleanliness when going up, go down with the
     * offset if touch the first slot (relativeIndex 0), keeping the cursor on the second slot (relativeIndex 1)
     */
    if (relativeIndex <= 0 && this.currentIndex > 0) {
      this.scrollOffset = this.currentIndex - 1;
    }

    // Head-to-tail jump
    if (this.currentIndex < this.scrollOffset) {
      this.scrollOffset = this.currentIndex;
    }

    // Apply physical limits: the offset cannot be negative nor exceed the maximum possible
    this.scrollOffset = Math.max(0, Math.min(this.scrollOffset, maxScrollOffset));
  }

  protected onItemSelect(): void {
    // To be implemented by subclasses
  }

  protected lockIndicator(): void {
    this.isIndicatorLocked = true;
  }

  protected unlockIndicator(): void {
    this.isIndicatorLocked = false;
  }

  protected close(): void {
    new ScreenTransition(() => {
      Events.emit(MENU_SCREEN_CLOSE);
    }, this._closeTransitionConfig);
  }
}
