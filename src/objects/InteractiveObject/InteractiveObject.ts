import { GameObject } from '../../lib/GameObject';
import { StoryFlags } from '../../lib/StoryFlags';
import type { InteractionContent, InteractionContentConfig, InteractiveObjectConfig } from './interactiveObject.types';

export class InteractiveObject extends GameObject {
  private readonly _textContent: InteractionContentConfig[];
  private readonly _textPortraitFrame?: number | null;

  constructor(config: InteractiveObjectConfig) {
    super(config);

    const {
      interactionConfig: { content, portraitFrame },
    } = config;

    // Say something when talking
    this._textContent = content;
    this._textPortraitFrame = portraitFrame;
  }

  getTextContent(): InteractionContent | null {
    if (this._textContent.length === 0) {
      return null;
    }

    const match = StoryFlags.getRelevantScenario(this._textContent);

    if (!match) {
      console.warn('No matches found in this list!', this._textContent);
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
