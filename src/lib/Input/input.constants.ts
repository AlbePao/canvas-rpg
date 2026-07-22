import type { Directions } from '../../types/directions';
import type { Registry } from '../../types/registry';
import { objectKeys } from '../Game';

// Input events
export const DIRECTION_TAP = 'DIRECTION_TAP';

export const HOLD_THRESHOLD = 120; // milliseconds

export const KEY_TO_DIRECTION: Registry<string, Directions> = {
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
