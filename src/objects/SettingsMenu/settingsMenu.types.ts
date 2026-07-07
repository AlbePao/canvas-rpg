import type { GameSettingsKey } from '../../lib/Game';
import type { BaseOption } from '../../types/base-option';

export type SettingItem = BaseOption<SettingItemValue> & {
  selectedIndex: number; // current value of the option
  options: SettingOption[]; // options for this option item
};

export interface SettingOption {
  text: string;
  value: unknown;
}

export type SettingItemValue = GameSettingsKey | 'restoreDefaults' | 'goBack';
