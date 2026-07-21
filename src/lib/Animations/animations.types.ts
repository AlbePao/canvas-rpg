import type { FrameIndexPattern } from '../FrameIndexPattern';

export type AnimationPattern = Partial<Record<AnimationFrame, FrameIndexPattern>>;

export const ANIMATION_STANDING_FRAMES = ['standDown', 'standLeft', 'standRight', 'standUp'] as const;
export type StandingFrame = (typeof ANIMATION_STANDING_FRAMES)[number];

export const ANIMATION_WALKING_FRAMES = ['walkDown', 'walkLeft', 'walkRight', 'walkUp'] as const;
export type WalkingFrame = (typeof ANIMATION_WALKING_FRAMES)[number];

export const ANIMATION_COLLECT_FRAMES = ['collectDown'] as const;
export type CollectFrame = (typeof ANIMATION_COLLECT_FRAMES)[number];

export type AnimationFrame = StandingFrame | WalkingFrame | CollectFrame;
