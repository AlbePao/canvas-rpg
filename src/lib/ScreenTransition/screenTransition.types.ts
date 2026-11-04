import type { ReadonlyRecord } from '../../types/readonlyRecord';

export type TransitionName = 'fadeWhite' | 'fadeBlack' | 'none';

export type ScreenTransitionCallback = () => void | Promise<void>;

export type ScreenTransitions = ReadonlyRecord<TransitionName, string>;

export interface ScreenTransitionConfig {
  transition: TransitionName;
}
