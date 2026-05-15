import type { FrameIndexPattern } from '../FrameIndexPattern';

export type AnimationPattern = Partial<Record<AnimationFrame, FrameIndexPattern>>;

export type AnimationFrame =
  | 'standDown'
  | 'standLeft'
  | 'standRight'
  | 'standUp'
  | 'walkDown'
  | 'walkLeft'
  | 'walkRight'
  | 'walkUp'
  | 'pickUpDown';
