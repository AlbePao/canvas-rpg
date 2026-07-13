import type { BgKey } from '../../lib/Resources';
import type { ItemKey } from '../Item';

export interface BattleConfig {
  background: BgKey;
  addsFlag: string; // Adds a flag to the story flags when the battle is won
  winData: {
    text: string[];
    money: number;
    itemKeys: ItemKey[];
    experience: number;
  };
}
