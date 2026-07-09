export type TransitionName = 'fadeWhite' | 'fadeBlack' | 'none';

export type ScreenTransitions = Record<TransitionName, string>;

export interface ScreenTransitionConfig {
  transition: TransitionName;
}
