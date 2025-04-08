import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { getCharacterFrame, getCharacterWidth } from './spriteFontMap';

type Word = {
  wordWidth: number;
  chars: Char[];
};

type Char = {
  width: number;
  sprite: Sprite;
};

export class SpriteTextString extends GameObject {
  backdrop = new Sprite({
    resource: resources.images.textBox,
    frameSize: new Vector2(256, 64),
  });

  words: Word[];

  constructor(str?: string) {
    super({
      position: new Vector2(32, 112),
    });

    const content = str ?? 'Default text';

    // Create an array of words
    this.words = content.split(' ').map((word) => {
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
            resource: resources.images.fontWhite,
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
  }

  drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Configurations options
    const PADDING_LEFT = 7;
    const PADDING_TOP = 7;
    const LINE_WIDTH_MAX = 240;
    const LINE_VERTICAL_HEIGHT = 14;

    // Initial position of cursor
    let cursorX = drawPosX + PADDING_LEFT;
    let cursorY = drawPosY + PADDING_TOP;

    this.words.forEach((word) => {
      // Decide if we can fit this next word on this next line
      const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;

      if (spaceRemaining < word.wordWidth) {
        cursorX = drawPosX + PADDING_LEFT;
        cursorY += LINE_VERTICAL_HEIGHT;
      }

      // Draw this whole segment of text
      word.chars.forEach((char) => {
        const { sprite, width } = char;

        const widthCharOffset = cursorX - 5;
        sprite.draw(ctx, widthCharOffset, cursorY);

        // Add width of the character we just printed to cursor pos
        cursorX += width;

        // Plus 1px  between character
        cursorX += 1;
      });

      // Move the cursor over
      cursorX += 3;
    });
  }
}
