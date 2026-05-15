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
  | 'pickUpDown'
  | 'hover1'
  | 'hover2'
  | 'hover3'
  | 'hover4'
  | 'hit1'
  | 'hit2';
