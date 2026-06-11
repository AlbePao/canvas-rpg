import type { Directions } from '../../types/directions';
import { KEY_TO_DIRECTION } from './input.constants';

export function getDirectionFromCode(code: string): Directions | null {
  return KEY_TO_DIRECTION[code] ?? null;
}
