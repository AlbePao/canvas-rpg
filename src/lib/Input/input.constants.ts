import type { Directions } from '../../types/directions';
import type { ReadonlyRecord } from '../../types/readonlyRecord';
import { objectKeys } from '../Game';

// Input events
export const DIRECTION_TAP = 'DIRECTION_TAP';

export const HOLD_THRESHOLD = 120; // milliseconds

export const KEY_TO_DIRECTION: ReadonlyRecord<string, Directions> = {
  ArrowUp: 'up',
  KeyW: 'up',
  ArrowDown: 'down',
  KeyS: 'down',
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
};

export const DIRECTION_KEYS = new Set(objectKeys(KEY_TO_DIRECTION));
