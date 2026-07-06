import type { BaseOption } from '../../types/base-option';

export type SettingItem = BaseOption<OptionItemValue> & {
  selectedIndex: number; // current value of the option
  options: SettingItem[]; // options for this option item
};

export type OptionItemValue = 'text_speed' | 'go_back';
