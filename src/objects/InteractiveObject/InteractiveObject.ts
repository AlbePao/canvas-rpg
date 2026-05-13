import { GameObject } from '../../lib/GameObject';
import { StoryFlags } from '../../lib/StoryFlags';
import type { TextContent, TextContentConfig } from '../../lib/StoryFlags/storyFlags.types';
import { Vector2 } from '../../lib/Vector2';
import type { InteractiveObjectConfig } from './interactiveObject.types';

// TODO: extend to handle also selection box
export class InteractiveObject extends GameObject {
  textContent: TextContentConfig[];
  textPortraitFrame: number | null;

  constructor({ id, x, y, textConfig }: InteractiveObjectConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    // Say something when talking
    this.textContent = textConfig?.content ?? [];
    this.textPortraitFrame = textConfig?.portraitFrame ?? null;
  }

  getTextContent(): TextContent | null {
    if (this.textContent.length === 0) {
      return null;
    }

    const match = StoryFlags.getRelevantScenario(this.textContent);

    if (!match) {
      console.warn('No matches found in this list!', this.textContent);
      return null;
    }

    return {
      portraitFrame: this.textPortraitFrame,
      string: match.string,
      addsFlag: match.addsFlag ?? null,
    };
  }
}
