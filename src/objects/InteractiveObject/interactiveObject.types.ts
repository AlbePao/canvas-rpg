import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import type { ItemKey } from '../Item';

export type InteractiveObjectConfig = GameObjectBaseConfig & {
  interactionConfig?: InteractionConfig;
};

export interface InteractionConfig {
  portraitFrame?: number | null;
  content: InteractionContentConfig[];
}

export interface InteractionContentConfig {
  string: string[];
  requires?: string[];
  bypass?: string[];
  addsFlag?: string;
  item?: ItemKey;
}

export interface InteractionContent {
  portraitFrame: number | null;
  string: string[];
  addsFlag: string | null;
  item: ItemKey | null;
}
