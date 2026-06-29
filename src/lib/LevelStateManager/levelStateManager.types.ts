import type { ChestStatus } from '../../objects/Chest';

export type LevelObjectState = Partial<{
  status?: ChestStatus;
  removed?: boolean;
}>;

export type LevelState = Record<string, LevelObjectState>;

export type LevelsState = Record<string, LevelState>;
