import type { GameObjectConfig } from '../../lib/GameObject';
import type { BaseOption } from '../../types/base-option';
import type { ItemKey } from '../Item';

export type SelectionOption<T extends string = string> = BaseOption<T> & {
  response?: string[]; // response from the object when this option is selected
  addsFlag?: string; // optional flag to be added when this option is selected
  exclude?: string[]; // optional flag to exclude the option from selection if story flags are set
  include?: string[]; // optional flag to include the option from selection if story flags are set
  itemKey?: ItemKey; // optional item to be given to the player when this option is selected
};

export interface SelectionBoxConfig<T extends BaseOption = SelectionOption> extends GameObjectConfig {
  options: T[];
}
