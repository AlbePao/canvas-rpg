import type { GameSettingsKey } from '../../lib/Game';
import type { BaseOption } from '../../types/baseOption';

export type SettingItem = BaseOption<SettingItemValue> & {
  selectedIndex: number; // current selected value index for this option
  options: SettingOption[]; // options for this option item
};

export interface SettingOption {
  text: string;
  value: string | boolean | number;
}

export type SettingItemValue = GameSettingsKey | 'goBack';
