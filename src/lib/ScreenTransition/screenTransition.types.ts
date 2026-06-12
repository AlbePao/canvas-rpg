export type TransitionName = 'fadeWhite' | 'fadeBlack' | 'none';

export type ScreenTransitionMap = Record<TransitionName, string>;

export interface ScreenTransitionConfig {
  transition: TransitionName;
}
