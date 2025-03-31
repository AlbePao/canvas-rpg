import { AnimationConfig } from '../../types/animationConfig';

const makeWalkingFrame = (rootFrame = 0): AnimationConfig => {
  return {
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
  };
};

const makeStandingFrames = (rootFrame = 0): AnimationConfig => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
    ],
  };
};

export const STAND_DOWN = makeStandingFrames(1);
export const STAND_RIGHT = makeStandingFrames(4);
export const STAND_UP = makeStandingFrames(7);
export const STAND_LEFT = makeStandingFrames(10);

export const WALK_DOWN = makeWalkingFrame(0);
export const WALK_RIGHT = makeWalkingFrame(3);
export const WALK_UP = makeWalkingFrame(6);
export const WALK_LEFT = makeWalkingFrame(9);
