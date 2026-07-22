import type { ChestStatus } from '../../objects/Chest';

export type LevelObjectState = Partial<{
  status?: ChestStatus;
  removed?: boolean;
}>;

export type LevelsState = Record<string, Record<string, LevelObjectState>>;

export type LevelStateMap = Map<string, LevelObjectState>;
export type LevelsStateMap = Map<string, LevelStateMap>;
