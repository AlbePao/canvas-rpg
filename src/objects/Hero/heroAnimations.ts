import type { AnimationConfig } from '../../types/animationConfig';

const makeWalkingFrame = (rootFrame = 0): AnimationConfig => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: rootFrame + 1,
    },
    {
      time: 100,
      frame: rootFrame,
    },
    {
      time: 200,
      frame: rootFrame + 1,
    },
    {
      time: 300,
      frame: rootFrame + 2,
    },
  ],
});

const makeStandingFrames = (rootFrame = 0): AnimationConfig => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: rootFrame,
    },
  ],
});

export const HERO_STAND_DOWN = makeStandingFrames(1);
export const HERO_STAND_RIGHT = makeStandingFrames(4);
export const HERO_STAND_UP = makeStandingFrames(7);
export const HERO_STAND_LEFT = makeStandingFrames(10);

export const HERO_WALK_DOWN = makeWalkingFrame(0);
export const HERO_WALK_RIGHT = makeWalkingFrame(3);
export const HERO_WALK_UP = makeWalkingFrame(6);
export const HERO_WALK_LEFT = makeWalkingFrame(9);

export const HERO_PICK_UP_DOWN: AnimationConfig = {
  duration: 400,
  frames: [
    {
      time: 0,
      frame: 12,
    },
  ],
};
