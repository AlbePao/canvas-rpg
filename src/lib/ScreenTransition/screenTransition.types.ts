import type { ReadonlyRegistry } from '../../types/readonlyRegistry';

export type TransitionName = 'fadeWhite' | 'fadeBlack' | 'none';

export type ScreenTransitions = ReadonlyRegistry<TransitionName, string>;

export interface ScreenTransitionConfig {
  transition: TransitionName;
}
