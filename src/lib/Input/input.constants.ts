import { objectKeys } from '../../helpers/objectKeys';
import type { Directions } from '../../types/directions';

// Input events
export const DIRECTION_TAP = 'DIRECTION_TAP';

export const HOLD_THRESHOLD = 120; // milliseconds

export const KEY_TO_DIRECTION: Readonly<Record<string, Directions>> = {
  ArrowUp: 'UP',
  KeyW: 'UP',
  ArrowDown: 'DOWN',
  KeyS: 'DOWN',
  ArrowLeft: 'LEFT',
  KeyA: 'LEFT',
  ArrowRight: 'RIGHT',
  KeyD: 'RIGHT',
};

export const DIRECTION_KEYS = new Set(objectKeys(KEY_TO_DIRECTION));
