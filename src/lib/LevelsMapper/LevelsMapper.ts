import type { LevelMap } from '../LevelBuilder';
import { Singleton } from '../Singleton';
import { createLevelMapSchema, LevelsIdsSchema } from './levelsMapper.schema';

interface LoadLevelResult {
  id: string;
  success: boolean;
  error?: string;
}

/**
 * Helper per assicurarsi che l'array di stringhe non sia vuoto
 * Zod richiede che gli enum dinamici siano tupla: [string, ...string[]]
 */
function toZodEnumTuple(array: string[]): [string, ...string[]] {
  // if (!array || array.length === 0) {
  //   throw new Error('Impossibile inizializzare lo schema: un array di chiavi è vuoto o non valido.');
  // }
  return array as [string, ...string[]];
}

/**
 * LevelsMapper: Dynamically loads and validates level definitions from individual JSON files
 * Each level has its own JSON file in public/json/{levelId}.json
 * Provides type-safe access to all available levels
 */
class LevelsMapperSingleton extends Singleton<LevelsMapperSingleton>() {
  private readonly _levels = new Map<string, LevelMap>();
  private _isLoaded = false;

  /**
   * Load and validate all levels from individual JSON files
   * This should be called during app initialization (before starting the game)
   */
  async loadLevels(): Promise<void> {
    const loadResults: LoadLevelResult[] = [];

    try {
      // const [itemsRes, npcsRes, decosRes, tilesRes] = await Promise.all([
      //   fetch('/json/itemKeys.json'),
      //   fetch('/json/npcKeys.json'),
      //   fetch('/json/decorationKeys.json'),
      //   fetch('/json/tileKeys.json'),
      // ]);

      // if (!itemsRes.ok || !npcsRes.ok || !decosRes.ok || !tilesRes.ok) {
      //   throw new Error('LevelsMapper: failed to load dynamic keys for schema validation.');
      // }

      // const itemsJson = await itemsRes.json();
      // const npcsJson = await npcsRes.json();
      // const decosJson = await decosRes.json();
      // const tilesJson = await tilesRes.json();

      const validationSchema = createLevelMapSchema({
        levelIds: toZodEnumTuple([]), // Level IDs will be validated separately
        itemKeys: toZodEnumTuple([]),
        npcKeys: toZodEnumTuple([]),
        decorationTileNames: toZodEnumTuple([]),
        levelTilesNames: toZodEnumTuple([]),
        // itemKeys: toZodEnumTuple(itemsJson as string[]),
        // npcKeys: toZodEnumTuple(npcsJson as string[]),
        // decorationTileNames: toZodEnumTuple(decosJson as string[]),
        // levelTilesNames: toZodEnumTuple(tilesJson as string[]),
      });

      const levelsIdsResponse = await fetch(`/json/levelsIds.json`);

      if (!levelsIdsResponse.ok) {
        throw new Error('LevelsMapper: unable to find levels ids list');
      }

      const levelsIdsData = await levelsIdsResponse.json();
      const levelsIds = LevelsIdsSchema.parse(levelsIdsData);

      for (const levelId of levelsIds) {
        try {
          const response = await fetch(`/json/${levelId}.json`);

          if (!response.ok) {
            loadResults.push({
              id: levelId,
              success: false,
              error: `Failed to fetch ${levelId}: ${response.statusText}`,
            });
            continue;
          }

          const levelData = await response.json();

          // Validate the JSON structure against schema
          const validatedLevel = validationSchema.parse(levelData);

          // Verify the ID matches what we expect
          if (validatedLevel.id !== levelId) {
            loadResults.push({
              id: levelId,
              success: false,
              error: `Level ID mismatch: JSON has "${validatedLevel.id}" but expected "${levelId}"`,
            });
            continue;
          }

          this._levels.set(levelId, validatedLevel);
          loadResults.push({ id: levelId, success: true });
        } catch (error) {
          loadResults.push({
            id: levelId,
            success: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      // Report results
      const successCount = loadResults.filter((r) => r.success).length;
      const failureCount = loadResults.filter((r) => !r.success).length;
      const totalCount = levelsIds.length;

      if (failureCount > 0) {
        console.warn(`Loaded ${successCount}/${totalCount} levels`);
        for (const result of loadResults) {
          if (!result.success) {
            console.warn(`${result.id}: ${result.error}`);
          }
        }
      }

      if (successCount === 0) {
        throw new Error('LevelsMapper: failed to load any levels');
      }

      this._isLoaded = true;
    } catch (criticalError) {
      console.error('Critical initialization error in LevelsMapper:', criticalError);
      throw criticalError;
    }
  }

  /**
   * Get a specific level by ID
   * Returns null if the level doesn't exist
   */
  getLevel(id: string): LevelMap | null {
    if (!this._isLoaded) {
      throw new Error('LevelsMapper: levels not loaded yet. Call loadLevels() during app initialization.');
    }

    const level = this._levels.get(id);
    if (!level) {
      console.warn(`Level "${id}" not found in LevelsMapper`);
      return null;
    }

    return level;
  }

  /**
   * Get all loaded level IDs
   */
  getAllLevelIds(): string[] {
    if (!this._isLoaded) {
      throw new Error('LevelsMapper: levels not loaded yet. Call loadLevels() during app initialization.');
    }

    return Array.from(this._levels.keys());
  }

  /**
   * Check if a level exists
   */
  hasLevel(id: string): boolean {
    return this._levels.has(id);
  }

  /**
   * Check if levels are loaded
   */
  getIsLoaded(): boolean {
    return this._isLoaded;
  }
}

// Singleton instance
export const LevelsMapper = new LevelsMapperSingleton();
