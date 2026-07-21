import type { GameObjectConfig } from '../../lib/GameObject';
import type { BaseOption } from '../../types/base-option';
import type { BattleConfig } from '../Battle';

export type SelectionOption<T extends string = string> = BaseOption<T> &
  (
    | {
        response?: string[]; // response from the object when this option is selected
        addsFlag?: string; // optional flag to be added when this option is selected
        itemKey?: string; // optional item to be given to the player when this option is selected
      }
    // Start a battle when this option is selected
    | {
        response?: never;
        addsFlag?: never;
        itemKey?: never;
        battle: BattleConfig; // optional battle to be started when this option is selected
      }
  ) & {
    exclude?: string[]; // optional flags to exclude the option from selection if story flags are set
    include?: string[]; // optional flags to include the option from selection if story flags are set
  };

export interface SelectionBoxConfig<T extends BaseOption = SelectionOption> extends GameObjectConfig {
  options: T[];
}
