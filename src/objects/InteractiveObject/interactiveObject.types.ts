import type { GameObjectConfig } from '../../lib/GameObject';
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
  string: string[];
  requires?: string[];
  bypass?: string[];
} & (
  | {
      options?: SelectionOption[];
      addsFlag?: never;
      itemKey?: never;
    }
  | {
      options?: never;
      addsFlag?: string;
      itemKey?: ItemKey;
    }
);

export interface InteractionContent {
  portraitFrame: number | null;
  string: string[];
  addsFlag: string | null;
  itemKey: ItemKey | null;
  options: SelectionOption[];
}
