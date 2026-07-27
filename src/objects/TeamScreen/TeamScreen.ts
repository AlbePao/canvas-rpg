import { toGridSize } from '../../lib/Game';
import { createSpriteTextLines, drawTextLine, type Line } from '../../lib/Text';
import { MENU_SCREEN_GO_BACK_KEY, MenuScreen } from '../MenuScreen';
import {
  SELECTION_INDICATOR_OFFSET,
  SELECTION_INDICATOR_X_OFFSET,
  SELECTION_INDICATOR_Y_OFFSET,
} from '../SelectionBox';
import type { TeamMember } from './teamScreen.types';

export class TeamScreen extends MenuScreen<TeamMember> {
  private readonly _listLines: Line[] = [];

  constructor() {
    super({
      id: 'team',
      closeTransition: 'fadeBlack',
    });

    this.itemsList = [{ key: MENU_SCREEN_GO_BACK_KEY, text: 'Go back' }];

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
  }
}
