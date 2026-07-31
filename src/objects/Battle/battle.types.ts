import type { TeamMember } from '../../lib/TeamMembers/teamMembers.types';

export interface BattleConfig {
  background: string;
  addsFlag?: string; // Adds a flag to the story flags when the battle is won
  team: TeamMember[];
  rewardsData: BattleRewardsData;
}

export interface BattleRewardsData {
  text: string[];
  money: number;
  itemKeys: string[];
  experience: number;
}

export interface Weapon {
  name: string;
  damage: number;
  type: 'one-handed' | 'two-handed';
  attackType: 'melee' | 'distance';
}

export type BattleActionsValue = 'attack' | 'useItem' | 'flee';
