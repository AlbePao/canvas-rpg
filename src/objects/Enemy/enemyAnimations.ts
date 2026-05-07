import { AnimationConfig } from '../../types/animationConfig';

const makeHoveringFrame = (rootFrame = 0): AnimationConfig => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: rootFrame,
    },
    {
      time: 100,
      frame: rootFrame + 1,
    },
    {
      time: 200,
      frame: rootFrame + 2,
    },
    {
      time: 300,
      frame: rootFrame + 3,
    },
  ],
});

const makeHitFrame = (rootFrame = 0): AnimationConfig => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: rootFrame + 1,
    },
    {
      time: 150,
      frame: rootFrame,
    },
  ],
});

export const HOVER_1 = makeHoveringFrame(0);
export const HOVER_2 = makeHoveringFrame(1);
export const HOVER_3 = makeHoveringFrame(2);
export const HOVER_4 = makeHoveringFrame(3);

export const HIT_1 = makeHitFrame(4);
export const HIT_2 = makeHitFrame(5);
