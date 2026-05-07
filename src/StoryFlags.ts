import { Singleton } from './lib/Singleton';
import { NpcContentConfig } from './objects/Npc';

class StoryFlagsSingleton extends Singleton<StoryFlagsSingleton>() {
  flags = new Map<string, boolean>();

  add(flag: string): void {
    this.flags.set(flag, true);
  }

  getRelevantScenario(scenarios: NpcContentConfig[]): NpcContentConfig | null {
    return (
      scenarios.find((scenario) => {
        // Disqualify when any bypass flags are present
        const bypassFlags = scenario.bypass ?? [];
        for (const thisFlag of bypassFlags) {
          if (this.flags.has(thisFlag)) {
            return false;
          }
        }

        // Disqualify if we find a missing required flag
        const requiredFlags = scenario.requires ?? [];
        for (const thisFlag of requiredFlags) {
          if (!this.flags.has(thisFlag)) {
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
