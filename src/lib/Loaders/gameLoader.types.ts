import type { LevelSchemas } from '../GameSchemas';

export interface LoadedConfigResult {
  levelSchemas: LevelSchemas;
}

export interface ResourceFetcher {
  fetchJson(url: string): Promise<unknown>;
}
