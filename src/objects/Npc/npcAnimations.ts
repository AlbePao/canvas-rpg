import type { AnimationConfig } from '../../types/animationConfig';

const makeStandingFrame = (rootFrame = 0): AnimationConfig => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: rootFrame,
    },
  ],
});

const makeWalkingFrame = (rootFrame = 0): AnimationConfig => ({
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

export const NPC_STAND_DOWN = makeStandingFrame(0);
export const NPC_STAND_LEFT = makeStandingFrame(4);
export const NPC_STAND_RIGHT = makeStandingFrame(8);
export const NPC_STAND_UP = makeStandingFrame(12);

export const NPC_WALK_DOWN = makeWalkingFrame(1);
export const NPC_WALK_LEFT = makeWalkingFrame(5);
export const NPC_WALK_RIGHT = makeWalkingFrame(9);
export const NPC_WALK_UP = makeWalkingFrame(13);
