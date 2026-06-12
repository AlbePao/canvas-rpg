import type { GameObjectConfig } from '../../lib/GameObject';
import type { Directions } from '../../types/directions';

export type ArrowIndicatorConfig = GameObjectConfig & {
  direction: Directions;
};
