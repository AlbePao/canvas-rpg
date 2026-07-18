import type { FrameIndexPattern } from '../FrameIndexPattern';

export type AnimationPattern = Partial<Record<AnimationFrame, FrameIndexPattern>>;

export type StandingFrame = 'standDown' | 'standLeft' | 'standRight' | 'standUp';

export type WalkingFrame = 'walkDown' | 'walkLeft' | 'walkRight' | 'walkUp';

export type AnimationFrame = StandingFrame | WalkingFrame | 'collectDown';
