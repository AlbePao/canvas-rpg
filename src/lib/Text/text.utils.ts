import { Sprite } from '../../objects/Sprite';
import { Resources } from '../Resources';
import type { Line } from './text.types';

// Characters widths
const DEFAULT_WIDTH = 5;
const width = new Map<string, number>();

// Add overrides as needed
width.set('c', 4);
width.set('f', 4);
width.set('i', 2);
width.set('j', 4);
width.set('l', 3);
width.set('n', 4);

width.set('r', 4);
width.set('t', 4);
width.set('u', 4);
width.set('v', 4);
width.set('x', 4);
width.set('y', 4);
width.set('z', 4);

width.set('E', 4);
width.set('F', 4);
width.set('M', 7);
width.set('W', 7);

width.set(' ', 3);
width.set("'", 1);
width.set('!', 1);

// Characters frames
const frameMap = new Map<string, number>();
['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789 __', ".!-,?'"]
  .join('')
  .split('')
  .forEach((char, index) => {
    frameMap.set(char, index);
  });

const getCharacterWidth = (char: string): number => width.get(char) ?? DEFAULT_WIDTH;
const getCharacterFrame = (char: string): number => frameMap.get(char) ?? 0;

// Shared by any UI that needs to size a box around rendered sprite-text (InventoryMenu, SelectionBox, etc.)
export const calculateTextWidth = (text: string): number =>
  text.split('').reduce((lineWidth, char) => lineWidth + getCharacterWidth(char), 0);

export function createSpriteTextLines(strings: string[], idPrefix: string): Line[] {
  return strings.map((text) => {
    const words = text.split(' ').map((word) => {
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
            id: `${idPrefix}-char-${char}`,
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
}

// Draws a single line of sprite-text and returns the width in pixel of the drawn text
export function drawTextLine(
  ctx: CanvasRenderingContext2D,
  line: Line,
  drawPositionX: number,
  drawPositionY: number,
): number {
  let currentX = drawPositionX;

  for (const word of line.words) {
    // Draw this whole segment of text
    for (const { sprite, width } of word.chars) {
      sprite.draw(ctx, currentX - 5, drawPositionY);

      // Add width of the character we just printed to cursor pos, plus 1px between character
      currentX += width + 1;
    }

    // Move the cursor over
    currentX += 3;
  }

  return currentX - drawPositionX;
}
