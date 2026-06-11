import type { ScreenTransitionMap } from './screenTransition.types';

// Screen transition events
export const SCREEN_TRANSITION_START = 'SCREEN_TRANSITION_START';
export const SCREEN_TRANSITION_END = 'SCREEN_TRANSITION_END';

// Screen transition css classes
export const SCREEN_TRANSITION_CLASSNAME = 'ScreenTransition';

export const SCREEN_TRANSITION_BASE_CLASS = `
  .${SCREEN_TRANSITION_CLASSNAME} {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
`;

export const SCREEN_TRANSITIONS: ScreenTransitionMap = {
  fade: `
    .${SCREEN_TRANSITION_CLASSNAME}.fade-in {
      background: #fff;
      animation: scene-transition-fade-in 0.2s forwards;
    }

    .${SCREEN_TRANSITION_CLASSNAME}.fade-out {
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
