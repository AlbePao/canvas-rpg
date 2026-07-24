import { Sprite } from '../../objects/Sprite';
import { GameRegistry } from '../GameRegistry';
import type { Line, Word } from './text.types';

// Shared by any UI that needs to size a box around rendered sprite-text
export const calculateTextWidth = (text: string): number =>
  text.split('').reduce((lineWidth, char) => lineWidth + GameRegistry.chars.get(char).width, 0);

export function createSpriteTextLines(strings: string[], idPrefix: string): Line[] {
  const { chars, assets } = GameRegistry;

  return strings.map((text) => {
    const words = text.split(' ').map((word) => {
      // We need to know how wide this word is
      let wordWidth = 0;

      // Break each word into single characters
      const wordChars = word.split('').map((char) => {
        // Measure each one
        const { frame, width: charWidth } = chars.get(char);
        wordWidth += charWidth;

        const { hFrames, vFrames, frameSize, position, resource } = assets.get('font');

        // Also create a Sprite for each character in the word
        return {
          width: charWidth,
          sprite: new Sprite({
            id: `${idPrefix}-char-${char}`,
            resource,
            hFrames,
            vFrames,
            frameSize,
            frame,
            position,
          }),
        };
      });

      // Return a length and a list of characters per word
      return {
        wordWidth,
        chars: wordChars,
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
  words: Word[],
  drawPositionX: number,
  drawPositionY: number,
): number {
  let currentX = drawPositionX;

  for (const word of words) {
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
