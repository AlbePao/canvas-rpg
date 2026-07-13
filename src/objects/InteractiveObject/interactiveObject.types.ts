import type { GameObjectConfig } from '../../lib/GameObject';
import type { BattleConfig } from '../Battle';
import type { ItemKey } from '../Item';
import type { SelectionOption } from '../SelectionBox';

export type InteractiveObjectConfig = GameObjectConfig & {
  interactionConfig: InteractionConfig;
};

export interface InteractionConfig {
  portraitFrame?: number | null;
  content: InteractionContentConfig[];
}

export type InteractionContentConfig = {
  text: string[];
  requires?: string[];
  bypass?: string[];
} & (
  | {
      options?: never;
      addsFlag?: string;
      itemKey?: ItemKey;
      battle?: never;
    }
  | {
      options?: SelectionOption[];
      addsFlag?: never;
      itemKey?: never;
      battle?: never;
    }
  | {
      options?: never;
      addsFlag?: never;
      itemKey?: never;
      battle: InteractionBattleConfig;
    }
);

export interface InteractionBattleConfig extends BattleConfig {
  addsFlag: string;
}

export interface InteractionContent {
  portraitFrame: number | null;
  text: string[];
  addsFlag: string | null;
  itemKey: ItemKey | null;
  options: SelectionOption[];
  battle: InteractionBattleConfig | null;
}
