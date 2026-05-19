import { GameObject } from '../../lib/GameObject';
import { StoryFlags } from '../../lib/StoryFlags';
import type { InteractionContent, InteractionContentConfig, InteractiveObjectConfig } from './interactiveObject.types';

// TODO: extend to handle also selection box
export class InteractiveObject extends GameObject {
  textContent: InteractionContentConfig[];
  textPortraitFrame?: number | null;

  constructor(config: InteractiveObjectConfig) {
    super(config);

    const {
      interactionConfig: { content, portraitFrame },
    } = config;

    // Say something when talking
    this.textContent = content;
    this.textPortraitFrame = portraitFrame;
  }

  getTextContent(): InteractionContent | null {
    if (this.textContent.length === 0) {
      return null;
    }

    const match = StoryFlags.getRelevantScenario(this.textContent);

    if (!match) {
      console.warn('No matches found in this list!', this.textContent);
      return null;
    }

    return {
      portraitFrame: this.textPortraitFrame ?? null,
      string: match.string,
      addsFlag: match.addsFlag ?? null,
      item: match.item ?? null,
    };
  }
}
