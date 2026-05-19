import { END_TEXT_BOX } from '../../constants/events';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { Vector2 } from '../../lib/Vector2';
import type { Main } from '../Main';
import { getCharacterFrame, getCharacterWidth } from './spriteFontMap';
import type { Line, SpriteTextStringConfig } from './spriteTextBox.types';

export class SpriteTextBox extends GameObject {
  portrait?: Sprite;
  backdrop = new Sprite({
    id: `${this.id}-text-box-backdrop`,
    resource: Resources.images.textBox,
    frameSize: new Vector2(256, 64),
  });

  lines: Line[];

  // Typewriter
  showingCharIndex = 0;
  textSpeed = 80;
  timeUntilNextShow = this.textSpeed;

  // Current line
  currentLineIndex = 0;
  finalLineIndex = 0;

  constructor({ id, string, portraitFrame }: SpriteTextStringConfig) {
    super({
      id,
      x: 2,
      y: 7,
    });

    // Draw on top layer
    this.drawLayer = 'HUD';

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
              resource: Resources.images.fontWhite,
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

    this.finalLineIndex = this.lines.length - 1;

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
    // Listen for user input
    const input = root.input;

    if (input.getActionJustPressed('Space')) {
      const { finalCharIndex } = this.lines[this.currentLineIndex];

      if (this.showingCharIndex < finalCharIndex) {
        // Skip
        this.showingCharIndex = finalCharIndex;
        return;
      }

      if (this.currentLineIndex < this.finalLineIndex) {
        // Display next text line
        this.currentLineIndex += 1;
        this.showingCharIndex = 0;

        return;
      }

      // Done with the textbox
      Events.emit(END_TEXT_BOX);
    }

    // Word on typewriter
    this.timeUntilNextShow -= delta;

    if (this.timeUntilNextShow <= 0) {
      // Increase amount of characters that are drawn
      this.showingCharIndex += 1;

      // Reset time counter for next character
      this.timeUntilNextShow = this.textSpeed;
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the portrait
    if (this.portrait) {
      this.portrait.drawImage(ctx, drawPosX + 6, drawPosY + 6);
    }

    // Configurations options
    // Set padding according to portrait frame
    const PADDING_LEFT = this.portrait ? 27 : 12;
    const PADDING_TOP = 9;
    const LINE_WIDTH_MAX = 240;
    const LINE_VERTICAL_HEIGHT = 14;

    // Initial position of cursor
    let cursorX = drawPosX + PADDING_LEFT;
    let cursorY = drawPosY + PADDING_TOP;
    let currentShowingIndex = 0;

    this.lines[this.currentLineIndex].words.forEach((word) => {
      // Decide if we can fit this next word on this next line
      const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;

      if (spaceRemaining < word.wordWidth) {
        cursorX = drawPosX + PADDING_LEFT;
        cursorY += LINE_VERTICAL_HEIGHT;
      }

      // Draw this whole segment of text
      word.chars.forEach((char) => {
        // Stop here if we should not yet show the following character
        if (currentShowingIndex > this.showingCharIndex) {
          return;
        }

        const { sprite, width } = char;

        const widthCharOffset = cursorX - 5;
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
