import type { z } from 'zod';
import type { LevelMap } from '../../objects/LevelBuilder';
import { GameRegistry } from '../GameRegistry';
import type { LevelSchemas } from '../GameSchemas';
import { createLevelMapSchema } from '../GameSchemas';
import type { LevelLoadResult, ResourceFetcher } from './gameLoader.types';

export class LevelLoader {
  constructor(private readonly _fetcher: ResourceFetcher) {}

  /**
   * Loads and validates all levels specified in the provided level schemas.
   */
  async loadLevels(levelSchemas: LevelSchemas): Promise<LevelLoadResult[]> {
    const levelMapSchema = createLevelMapSchema(levelSchemas);
    const loadResults: LevelLoadResult[] = [];

    for (const levelId of levelSchemas.levelsIds) {
      const result = await this._loadSingleLevel(levelId, levelMapSchema);

      if (result.success) {
        GameRegistry.levels.load({ [levelId]: result.level });
      }

      loadResults.push(result);
    }

    return loadResults;
  }

  private async _loadSingleLevel(levelId: string, schema: z.ZodType<LevelMap>): Promise<LevelLoadResult> {
    try {
      const rawLevelData = await this._fetcher.fetchJson(`/json/levels/${levelId}.json`);
      const validatedLevel = schema.parse(rawLevelData);

      if (validatedLevel.id !== levelId) {
        return {
          id: levelId,
          success: false,
          error: `Level ID mismatch: JSON has "${validatedLevel.id}" but expected "${levelId}"`,
        };
      }

      return {
        id: levelId,
        success: true,
        level: validatedLevel,
      };
    } catch (error) {
      return {
        id: levelId,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
