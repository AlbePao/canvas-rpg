import type { MovableObjectConfig } from '../MovableObject';

export type HeroConfig = Omit<MovableObjectConfig, 'behaviorConfig'>;
