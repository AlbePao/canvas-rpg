import type { GameObjectConfig } from '../../lib/GameObject';

export type HeroConfig = Pick<GameObjectConfig, 'id' | 'x' | 'y'>;
