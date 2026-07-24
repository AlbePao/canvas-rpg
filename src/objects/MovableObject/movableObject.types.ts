import type { Directions } from '../../types/directions';
import type { InteractiveObjectConfig } from '../InteractiveObject';

export type MovableObjectConfig<B = MovableObjectBehavior> = InteractiveObjectConfig & {
  facingDirection?: Directions;
  behaviorConfig?: B[];
};

export type MovableObjectBehavior<T = unknown, E = Record<string, unknown>> = {
  type: T;
  direction: Directions;
} & E;

export type MovableObjectLockReason = 'battle' | 'cutscene' | 'pause' | 'textBox' | 'transition';

export type MovableObjectLockSource = [string, MovableObjectLockReason];
