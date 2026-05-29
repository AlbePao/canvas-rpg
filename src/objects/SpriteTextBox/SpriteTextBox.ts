import { TEXT_BOX_END } from '../../constants/events';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import type { Main } from '../Main';
import { Sprite } from '../Sprite';
import { getCharacterFrame, getCharacterWidth } from './spriteFontMap';
import type { Line, SpriteTextStringConfig } from './spriteTextBox.types';

// Text box dimensions (in grid cells, 16px per cell)
export const TEXT_BOX_WIDTH = 16; // 256 pixels
export const TEXT_BOX_HEIGHT = 4; // 64 pixels

// Rendering constants for text layout
export const TEXT_BOX_PADDING_LEFT_WITH_PORTRAIT = 27;
export const TEXT_BOX_PADDING_LEFT_NO_PORTRAIT = 12;
export const TEXT_BOX_PADDING_TOP = 9;
export const TEXT_BOX_LINE_WIDTH_MAX = 240;
export const TEXT_BOX_LINE_VERTICAL_HEIGHT = 14;
export const TEXT_BOX_PORTRAIT_OFFSET_X = 6;
export const TEXT_BOX_PORTRAIT_OFFSET_Y = 6;
export const TEXT_BOX_CHARACTER_OFFSET_X = 5;

// Typewriter animation constants
export const TYPEWRITER_DEFAULT_SPEED = 80; // milliseconds per character

// TODO: add an arrow down on the text box when remaining text lines are > 1
export class SpriteTextBox extends GameObject {
  readonly portrait?: Sprite;
  backdrop = new Sprite({
    id: `${this.id}-text-box-backdrop`,
    resource: Resources.images.textBox,
    frameSize: new Vector2(256, 64),
  });

  readonly lines: Line[];

  // Typewriter state
  private _showingCharIndex = 0;
  readonly textSpeed: number;
  private _timeUntilNextShow: number;

  // Current line state
  private _currentLineIndex = 0;
  private readonly _finalLineIndex: number;

  private _isSelectionBoxOpened = false;

  constructor({ id, string, portraitFrame, speed }: SpriteTextStringConfig) {
    super({
      id,
      x: 2,
      y: 7,
    });

    // Draw on top layer
    this.drawLayer = 'HUD';
    this.textSpeed = speed ?? TYPEWRITER_DEFAULT_SPEED;
    this._timeUntilNextShow = this.textSpeed;

    // Create an array of words in an an array of lines (because it helps with line wrapping later)
    this.lines = string.map((content) => {
      const words = content.split(' ').map((word) => {
        // We need to know how wide this word is
        let wordWidth = 0;

        // Break each word into single characters
        const chars = word.split('').map((char) => {
          // Measure each one
          const charWidth = getCharacterWidth(char);
          wordWidth += charWidth;

          // Also create a Sprite for each character in the word
          return {
            width: charWidth,
            sprite: new Sprite({
              id: `${id}-char-${char}`,
              resource: Resources.images.font,
              hFrames: 13,
              vFrames: 6,
              frame: getCharacterFrame(char),
            }),
          };
        });

        // Return a length and a list of characters per word
        return {
          wordWidth,
          chars,
        };
      });

      return {
        words,
        // Get the last char index of the current line
        finalCharIndex: words.reduce((count, { chars }) => count + chars.length, 0),
      };
    });

    this._finalLineIndex = this.lines.length - 1;

    // Create a portrait
    if (portraitFrame !== null) {
      this.portrait = new Sprite({
        id: `${id}-portrait`,
        resource: Resources.images.portraits,
        hFrames: 4,
        frame: portraitFrame,
      });
    }
  }

  override step(delta: number, root: Main): void {
    // Listen for input
    const { input } = root;

    if (input.getActionJustPressed('Space')) {
      const { finalCharIndex } = this.lines[this._currentLineIndex];

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
      Events.emit(TEXT_BOX_END);
    }

    // Word on typewriter
    this._timeUntilNextShow -= delta;

    if (this._timeUntilNextShow <= 0) {
      // Increase amount of characters that are drawn
      this._showingCharIndex += 1;

      // Reset time counter for next character
      this._timeUntilNextShow = this.textSpeed;
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

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

    this.lines[this._currentLineIndex].words.forEach((word) => {
      // Decide if we can fit this next word on this next line
      const spaceRemaining = drawPosX + TEXT_BOX_LINE_WIDTH_MAX - cursorX;

      if (spaceRemaining < word.wordWidth) {
        cursorX = drawPosX + paddingLeft;
        cursorY += TEXT_BOX_LINE_VERTICAL_HEIGHT;
      }

      // Draw this whole segment of text
      word.chars.forEach((char) => {
        // Stop here if we should not yet show the following character
        if (currentShowingIndex > this._showingCharIndex) {
          return;
        }

        const { sprite, width } = char;

        const widthCharOffset = cursorX - TEXT_BOX_CHARACTER_OFFSET_X;
        sprite.draw(ctx, widthCharOffset, cursorY);

        // Add width of the character we just printed to cursor pos
        cursorX += width;

        // Plus 1px  between character
        cursorX += 1;

        // Uptick the index we are counting
        currentShowingIndex += 1;
      });

      // Move the cursor over
      cursorX += 3;
    });
  }
}
