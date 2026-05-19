import type { AnimationFrame } from '../lib/Animations';
import type { Directions } from '../types/directions';

export const STANDING_DIRECTIONS: Record<Directions, AnimationFrame> = {
  DOWN: 'standDown',
  UP: 'standUp',
  LEFT: 'standLeft',
  RIGHT: 'standRight',
};
