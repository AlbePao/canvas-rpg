import { Resources } from '../lib/Resources';
import { Sprite } from '../objects/Sprite';
import { getCharacterFrame, getCharacterWidth, type Line } from '../objects/SpriteTextBox';

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
