import type { GameObjectConfig } from '../../lib/GameObject';

export type TextBoxConfig = GameObjectConfig & {
  portraitFrame?: number | null;
  text: string[];
  speed?: number;
  autoClose?: boolean;
};
