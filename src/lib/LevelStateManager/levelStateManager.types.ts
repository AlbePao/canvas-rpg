import type { ChestStatus } from '../../objects/Chest';

export type LevelObjectState = Partial<{
  status?: ChestStatus;
  removed?: boolean;
}>;

export type LevelState = Map<string, LevelObjectState>;
