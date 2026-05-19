import { GameObject } from '../../lib/GameObject';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import type { InteractionContent, InteractionContentConfig, InteractiveObjectConfig } from './interactiveObject.types';

// TODO: extend to handle also selection box
export class InteractiveObject extends GameObject {
  textContent: InteractionContentConfig[];
  textPortraitFrame: number | null;

  constructor({ id, x, y, interactionConfig, behaviorConfig }: InteractiveObjectConfig) {
    super({
      id,
      position: new Vector2(x, y),
      behaviorConfig,
    });

    // Say something when talking
    this.textContent = interactionConfig?.content ?? [];
    this.textPortraitFrame = interactionConfig?.portraitFrame ?? null;
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
      portraitFrame: this.textPortraitFrame,
      string: match.string,
      addsFlag: match.addsFlag ?? null,
      item: match.item ?? null,
    };
  }
}
