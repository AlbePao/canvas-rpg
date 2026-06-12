import type { InteractionContentConfig } from '../../objects/InteractiveObject/interactiveObject.types';
import { Singleton } from '../Singleton';

class StoryFlagsSingleton extends Singleton<StoryFlagsSingleton>() {
  get flags(): string[] {
    return [...this._flags.keys()];
  }
  private readonly _flags = new Map<string, boolean>();

  add(flag: string): void {
    this._flags.set(flag, true);
  }

  has(flag: string): boolean {
    return this._flags.has(flag);
  }

  getRelevantScenario(scenarios: InteractionContentConfig[]): InteractionContentConfig | null {
    return (
      scenarios.find((scenario) => {
        // Disqualify when any bypass flags are present
        const bypassFlags = scenario.bypass ?? [];
        for (const thisFlag of bypassFlags) {
          if (this._flags.has(thisFlag)) {
            return false;
          }
        }

        // Disqualify if we find a missing required flag
        const requiredFlags = scenario.requires ?? [];
        for (const thisFlag of requiredFlags) {
          if (!this._flags.has(thisFlag)) {
            return false;
          }
        }

        // If we made this far, the scenario is relevant
        return true;
      }) ?? null
    );
  }
}

export const StoryFlags = StoryFlagsSingleton.getInstance();
