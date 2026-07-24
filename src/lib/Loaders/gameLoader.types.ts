import type { LevelMap } from '../../objects/LevelBuilder';
import type { LevelSchemas } from '../GameSchemas';

export interface LoadedConfigResult {
  levelSchemas: LevelSchemas;
}

export interface ResourceFetcher {
  fetchJson(url: string): Promise<unknown>;
}

export type LevelLoadResult = {
  id: string;
} & (
  | {
      success: true;
      level: LevelMap;
    }
  | {
      success: false;
      error?: string;
    }
);
