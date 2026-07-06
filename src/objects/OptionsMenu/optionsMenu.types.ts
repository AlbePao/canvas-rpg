import type { BaseOption } from '../../types/base-option';

export type OptionItem = BaseOption<OptionItemValue> & {
  selected: string; // current value of the option
  options: OptionItem[]; // options for this option item
};

export type OptionItemValue = 'go_back';
