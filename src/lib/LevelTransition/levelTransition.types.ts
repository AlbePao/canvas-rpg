// TODO add other level transitions
export type TransitionName = 'fade';

export type LevelTransitionMap = Record<TransitionName, string>;

export interface LevelTransitionConfig {
  transition: TransitionName;
}
