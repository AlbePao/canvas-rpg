import type { ReadonlyRecord } from '../../types/readonlyRecord';

export type TransitionName = 'fadeWhite' | 'fadeBlack' | 'none';

export type ScreenTransitions = ReadonlyRecord<TransitionName, string>;

export interface ScreenTransitionConfig {
  transition: TransitionName;
}
