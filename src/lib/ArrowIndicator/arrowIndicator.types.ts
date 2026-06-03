import type { Directions } from '../../types/directions';
import type { GameObjectConfig } from '../GameObject';

export type ArrowIndicatorConfig = GameObjectConfig & {
  direction: Directions;
};
