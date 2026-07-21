import type { BgKey } from '../../lib/Resources';

export interface BattleConfig {
  background: BgKey;
  addsFlag?: string; // Adds a flag to the story flags when the battle is won
  // team: BattleTeamMemberConfig;
  winData: {
    text: string[];
    money: number;
    itemKeys: string[];
    experience: number;
  };
}

export interface BattleTeamMemberConfig {
  name: string;
  level: number;
  health: number;
  mana: number;
  // Add other stats as needed
}
