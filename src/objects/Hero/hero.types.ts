import type { GameObjectConfig } from '../../lib/GameObject';
import type { Directions } from '../../types/directions';

export type HeroConfig = GameObjectConfig & {
  facingDirection?: Directions;
};
