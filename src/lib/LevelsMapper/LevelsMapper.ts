import { GameRegistry } from '../GameRegistry';
import type { LevelMap } from '../LevelBuilder';
import { Singleton } from '../Singleton';
import {
  createAnimationsSchema,
  createDecorationsFrameMapSchema,
  createItemsRegistrySchema,
  createLevelMapSchema,
  createTilesFrameMapSchema,
  LevelsIdsSchema,
} from './levelsMapper.schema';
import type { LevelLoadResult } from './levelsMapper.types';

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
    try {
      const results = await Promise.all([
        fetch('/json/config/animations.json'),
        fetch('/json/config/decorationsFrameMap.json'),
        fetch('/json/config/items.json'),
        fetch('/json/config/levelsIds.json'),
        fetch('/json/config/tilesFrameMap.json'),
      ]);

      if (results.some((res) => !res.ok)) {
        throw new Error('LevelsMapper: failed to load dynamic game data for schema validation.');
      }

      const [animationsResponse, decorationsResponse, itemsResponse, levelsIdsResponse, tilesResponse] = results;

      const animationsData = await animationsResponse.json();
      const decorationsData = await decorationsResponse.json();
      const itemsData = await itemsResponse.json();
      const levelsIdsData = await levelsIdsResponse.json();
      const tilesData = await tilesResponse.json();

      const { schema: AnimationsSchema } = createAnimationsSchema(animationsData);
      const { schema: DecorationsSchema, decorationKeys } = createDecorationsFrameMapSchema(decorationsData);
      const { schema: ItemsSchema, itemKeys } = createItemsRegistrySchema(itemsData);
      const levelsIds = LevelsIdsSchema.parse(levelsIdsData);
      const { schema: TilesSchema, tileKeys } = createTilesFrameMapSchema(tilesData);

      const { loadItemsRegistry, loadTilesFrameMapRegistry, loadDecorationsFrameMapRegistry, loadAnimationsRegistry } =
        GameRegistry;

      loadAnimationsRegistry(AnimationsSchema.parse(animationsData));
      loadDecorationsFrameMapRegistry(DecorationsSchema.parse(decorationsData));
      loadItemsRegistry(ItemsSchema.parse(itemsData));
      loadTilesFrameMapRegistry(TilesSchema.parse(tilesData));

      const LevelValidationSchema = createLevelMapSchema({
        decorationKeys,
        itemKeys,
        levelsIds,
        tileKeys,
      });

      const levelLoadResults: LevelLoadResult[] = [];

      for (const levelId of levelsIds) {
        try {
          const response = await fetch(`/json/levels/${levelId}.json`);

          if (!response.ok) {
            levelLoadResults.push({
              id: levelId,
              success: false,
              error: `Failed to fetch ${levelId}: ${response.statusText}`,
            });
            continue;
          }

          const levelData = await response.json();

          // Validate the JSON structure against schema
          const validatedLevel = LevelValidationSchema.parse(levelData);

          // Verify the ID matches what we expect
          if (validatedLevel.id !== levelId) {
            levelLoadResults.push({
              id: levelId,
              success: false,
              error: `Level ID mismatch: JSON has "${validatedLevel.id}" but expected "${levelId}"`,
            });
            continue;
          }

          this._levels.set(levelId, validatedLevel);
          levelLoadResults.push({ id: levelId, success: true });
        } catch (error) {
          levelLoadResults.push({
            id: levelId,
            success: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      // Report results
      const successCount = levelLoadResults.filter((r) => r.success).length;
      const failureCount = levelLoadResults.filter((r) => !r.success).length;
      const totalCount = levelsIds.length;

      if (failureCount > 0) {
        console.warn(`Loaded ${successCount}/${totalCount} levels`);
        for (const result of levelLoadResults) {
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
