export type TransitionName = 'fade';

export type ScreenTransitionMap = Record<TransitionName, string>;

export interface ScreenTransitionConfig {
  transition: TransitionName;
}
