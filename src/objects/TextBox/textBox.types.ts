import type { GameObjectConfig } from '../../lib/GameObject';

export type TextBoxConfig = Omit<GameObjectConfig, 'behaviorConfig'> & {
  portraitFrame?: number | null;
  text: string[];
  speed?: number;
};
