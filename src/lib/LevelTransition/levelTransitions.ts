import type { LevelTransitionMap } from './levelTransition.types';

export const LEVEL_TRANSITION_CLASSNAME = 'LevelTransition';

export const LEVEL_TRANSITION_BASE_CLASS = `
  .${LEVEL_TRANSITION_CLASSNAME} {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
`;

export const LEVEL_TRANSITIONS: LevelTransitionMap = {
  fade: `
    .${LEVEL_TRANSITION_CLASSNAME}.fade-in {
      background: #fff;
      animation: scene-transition-fade-in 0.2s forwards;
    }

    .${LEVEL_TRANSITION_CLASSNAME}.fade-out {
      animation: scene-transition-fade-out 0.2s forwards;
    }

    @keyframes scene-transition-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes scene-transition-fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,
};
