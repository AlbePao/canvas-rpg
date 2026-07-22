import type { Registry } from '../../types/registry';

export type TransitionName = 'fadeWhite' | 'fadeBlack' | 'none';

export type ScreenTransitions = Registry<TransitionName, string>;

export interface ScreenTransitionConfig {
  transition: TransitionName;
}
