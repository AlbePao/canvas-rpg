import type { GameObjectConfig } from '../../lib/GameObject';
import type { ItemKey } from '../Item';

export interface SelectionOption {
  text: string; // text of the option to be displayed in the selection box
  value: string; // value to be emitted when this option is selected
  response?: string[]; // response from the object when this option is selected
  addsFlag?: string; // optional flag to be added when this option is selected
  exclude?: string[]; // optional flag to exclude the option from selection if story flags are set
  itemKey?: ItemKey; // optional item to be given to the player when this option is selected
}

export interface SelectionBoxConfig extends GameObjectConfig {
  options: SelectionOption[];
}
