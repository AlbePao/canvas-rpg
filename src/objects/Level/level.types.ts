import { Vector2 } from '../../Vector2';

export type LevelConfig = Partial<{
  heroPosition: Vector2;
}>;
export type MainLevelConfig = { id: string } & LevelConfig;
