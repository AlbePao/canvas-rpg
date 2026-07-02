import type { Directions } from '../../types/directions';
import type { InteractiveObjectConfig } from '../InteractiveObject';

export type MovableObjectConfig = InteractiveObjectConfig & {
  behaviorConfig?: MovableObjectBehavior[];
};

export interface MovableObjectBehavior {
  type: unknown;
  direction: Directions;
}
