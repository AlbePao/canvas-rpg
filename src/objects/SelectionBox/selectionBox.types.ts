import type { GameObjectConfig } from '../../lib/GameObject';
import type { ItemKey } from '../Item';

export interface SelectionOption {
  name: string;
  value: string;
  response: string[];
  addsFlag?: string;
  item?: ItemKey;
}

export type SelectionBoxOptions = SelectionOption[];

export interface SelectionBoxConfig extends GameObjectConfig {
  options: SelectionOption[];
}
