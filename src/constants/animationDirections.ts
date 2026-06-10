import type { StandingFrame } from '../lib/Animations';
import type { Directions } from '../types/directions';

export const STANDING_DIRECTIONS: Readonly<Record<Directions, StandingFrame>> = {
  DOWN: 'standDown',
  UP: 'standUp',
  LEFT: 'standLeft',
  RIGHT: 'standRight',
};
