// TODO add other level transitions
export type LevelTransition = 'fade';

export type LevelTransitionMap = Record<LevelTransition, string>;

export interface LevelTransitionConfig {
  transition: LevelTransition;
}
