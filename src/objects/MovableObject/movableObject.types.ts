import type { Directions } from '../../types/directions';
import type { InteractiveObjectConfig } from '../InteractiveObject';

export type MovableObjectConfig = InteractiveObjectConfig & {
  facingDirection?: Directions;
  behaviorConfig?: MovableObjectBehavior[];
};

export interface MovableObjectBehavior {
  type: unknown;
  direction: Directions;
}

export type MovableObjectLockReason = 'battle' | 'cutscene' | 'pause' | 'textBox' | 'transition';

export type MovableObjectLockSource = [string, MovableObjectLockReason];
