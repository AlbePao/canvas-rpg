import type { AnimationConfig } from '../../types/animationConfig';

const makeStandingFrame = (rootFrame = 0): AnimationConfig => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: rootFrame,
    },
    {
      time: 200,
      frame: rootFrame + 1,
    },
    {
      time: 400,
      frame: rootFrame + 2,
    },
    {
      time: 600,
      frame: rootFrame + 3,
    },
  ],
});

export const STANDING_1 = makeStandingFrame(0);
export const STANDING_2 = makeStandingFrame(1);
export const STANDING_3 = makeStandingFrame(2);
export const STANDING_4 = makeStandingFrame(3);
