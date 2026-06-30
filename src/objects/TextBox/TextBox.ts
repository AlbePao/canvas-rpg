import { createSpriteTextLines } from '../../helpers/spriteText';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import type { Line } from '../../types/text';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import type { Main } from '../Main';
import { Sprite } from '../Sprite';
import {
  TEXT_BOX_CHARACTER_OFFSET_X,
  TEXT_BOX_CLOSE,
  TEXT_BOX_END,
  TEXT_BOX_LINE_VERTICAL_HEIGHT,
  TEXT_BOX_LINE_WIDTH_MAX,
  TEXT_BOX_PADDING_LEFT_NO_PORTRAIT,
  TEXT_BOX_PADDING_LEFT_WITH_PORTRAIT,
  TEXT_BOX_PADDING_TOP,
  TEXT_BOX_PORTRAIT_OFFSET_X,
  TEXT_BOX_PORTRAIT_OFFSET_Y,
  TEXT_CONTINUE_INDICATOR_PADDING_LEFT,
  TEXT_CONTINUE_INDICATOR_PADDING_TOP,
  TYPEWRITER_DEFAULT_SPEED,
} from './textBox.constants';
import type { TextBoxConfig } from './textBox.types';

export class TextBox extends GameObject {
  portrait?: Sprite;
  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-text-box-backdrop`,
    width: Game.textBoxBackdropWidth,
    height: Game.textBoxBackdropHeight,
  });

  private _lines: Line[] = [];

  private readonly _continueIndicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'DOWN',
  });

  // Typewriter state
  private _textSpeed = TYPEWRITER_DEFAULT_SPEED;
  private _showingCharIndex = 0;
  private _timeUntilNextShow = this._textSpeed;

  // Current line state
  private _currentLineIndex = 0;
  private _finalLineIndex = 0;

  constructor(config: TextBoxConfig) {
    const { id, x = 2, y = 8, text, portraitFrame, speed } = config;

    super({
      id,
      x,
      y,
    });

    // Draw on top layer
    this.drawLayer = 'HUD';
    this.updateLines({ id, text, portraitFrame, speed });
  }

  updateLines({ id, text, portraitFrame, speed }: TextBoxConfig): void {
    this._textSpeed = speed ?? TYPEWRITER_DEFAULT_SPEED;
    this._timeUntilNextShow = this._textSpeed;

    // Create an array of words in an an array of lines (because it helps with line wrapping later)
    this._lines = createSpriteTextLines(text, this.id);

    // Initialize indexes
    this._finalLineIndex = this._lines.length - 1;
    this._currentLineIndex = 0;

    // Create a portrait
    if (portraitFrame) {
      this.portrait = new Sprite({
        id: `${id}-portrait`,
        resource: Resources.images.portraits,
        hFrames: 4,
        frame: portraitFrame,
      });
    }
  }

  override step(delta: number, root: Main): void {
    const { input, isSelectionBoxOpened } = root;

    // Don't interact if options selection box is opened
    if (isSelectionBoxOpened) {
      return;
    }

    const { finalCharIndex } = this._lines[this._currentLineIndex];

    // Listen for input
    const isSelected = input.getActionJustPressed('Space') || input.getActionJustPressed('Enter');

    if (isSelected) {
      if (this._showingCharIndex < finalCharIndex) {
        // Skip
        this._showingCharIndex = finalCharIndex;

        return;
      }

      if (this._currentLineIndex < this._finalLineIndex) {
        // Display next text line
        this._currentLineIndex += 1;
        this._showingCharIndex = 0;

        return;
      }

      // Done with the textbox
      Events.emit<TextBox>(TEXT_BOX_CLOSE, this);
    }

    // Word on typewriter
    this._timeUntilNextShow -= delta;

    if (this._timeUntilNextShow <= 0) {
      // Increase amount of characters that are drawn
      this._showingCharIndex += 1;

      // Reset time counter for next character
      this._timeUntilNextShow = this._textSpeed;
    }

    if (this._showingCharIndex === finalCharIndex && this._currentLineIndex === this._finalLineIndex) {
      // Text box has shown all of its text, emit the end event so that it can trigger other events that requires the text box still opened, like a selection box
      Events.emit<TextBox>(TEXT_BOX_END, this);
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the portrait
    if (this.portrait) {
      this.portrait.drawImage(ctx, drawPosX + TEXT_BOX_PORTRAIT_OFFSET_X, drawPosY + TEXT_BOX_PORTRAIT_OFFSET_Y);
    }

    // Set padding according to portrait frame
    const paddingLeft = this.portrait ? TEXT_BOX_PADDING_LEFT_WITH_PORTRAIT : TEXT_BOX_PADDING_LEFT_NO_PORTRAIT;

    // Initial position of cursor
    let cursorX = drawPosX + paddingLeft;
    let cursorY = drawPosY + TEXT_BOX_PADDING_TOP;
    let currentShowingIndex = 0;

    const currentLineWords = this._lines[this._currentLineIndex].words;

    currentLineWords.forEach(({ wordWidth, chars }, wordIndex) => {
      // Decide if we can fit this next word on this next line
      const spaceRemaining = drawPosX + TEXT_BOX_LINE_WIDTH_MAX - cursorX;

      if (spaceRemaining < wordWidth) {
        cursorX = drawPosX + paddingLeft;
        cursorY += TEXT_BOX_LINE_VERTICAL_HEIGHT;
      }

      // Draw this whole segment of text
      chars.forEach((char, charIndex) => {
        // Stop here if we should not yet show the following character
        if (currentShowingIndex > this._showingCharIndex) {
          return;
        }

        const { sprite, width } = char;

        const widthCharOffset = cursorX - TEXT_BOX_CHARACTER_OFFSET_X;
        sprite.draw(ctx, widthCharOffset, cursorY);

        // Add width of the character we just printed to cursor pos, plus 1px between character
        cursorX += width + 1;

        // Uptick the index we are counting
        currentShowingIndex += 1;

        // If is the latest letter of the latest word of the line and it's not the last line, shows the continue indicator
        if (
          charIndex === chars.length - 1 &&
          wordIndex === currentLineWords.length - 1 &&
          this._currentLineIndex < this._finalLineIndex
        ) {
          this._continueIndicator.drawImage(
            ctx,
            drawPosX + TEXT_CONTINUE_INDICATOR_PADDING_LEFT,
            drawPosY + TEXT_CONTINUE_INDICATOR_PADDING_TOP,
          );
        }
      });

      // Move the cursor over
      cursorX += 3;
    });
  }
}
