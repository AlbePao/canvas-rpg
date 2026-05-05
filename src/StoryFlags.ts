import { Singleton } from './lib/Singleton';
import { NpcContent } from './objects/Npc';

class StoryFlagsSingleton extends Singleton<StoryFlagsSingleton>() {
  flags = new Map<string, boolean>();

  add(flag: string) {
    this.flags.set(flag, true);
  }

  getRelevantScenario(scenarios: NpcContent[]) {
    return scenarios.find((scenario) => {
      // Disqualify when any bypass flags are present
      const bypassFlags = scenario.bypass ?? [];
      for (let i = 0; i < bypassFlags.length; i++) {
        const thisFlag = bypassFlags[i];

        if (this.flags.has(thisFlag)) {
          return false;
        }
      }

      // Disqualify if we find a missing required flag
      const requiredFlags = scenario.requires ?? [];
      for (let i = 0; i < requiredFlags.length; i++) {
        const thisFlag = requiredFlags[i];

        if (!this.flags.has(thisFlag)) {
          return false;
        }
      }

      // If we made this far, the scenario is relevant
      return true;
    });
  }
}

export const StoryFlags = StoryFlagsSingleton.getInstance();
