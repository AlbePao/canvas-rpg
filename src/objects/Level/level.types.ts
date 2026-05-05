import { Vector2 } from '../../Vector2';

export interface LevelConfig {
  heroPosition: Vector2;
}

export type MainLevelConfig = { id: string } & LevelConfig;
