import { GameRegistry } from '../GameRegistry';
import { Singleton } from '../Singleton';
import {
  createAnimationsSchema,
  createAssetsSchema,
  createDecorationsFrameMapSchema,
  createItemsRegistrySchema,
  createLevelMapSchema,
  createTilesFrameMapSchema,
  LevelsIdsSchema,
} from './gameLoader.schema';
import type { LevelLoadResult } from './gameLoader.types';

/**
 * GameLoader: Dynamically loads and validates game data definitions from individual JSON files
 * Each definition has its own JSON file in public/json/
 * Provides type-safe access to all available data definitions through GameRegistry
 */
class GameLoaderSingleton extends Singleton<GameLoaderSingleton>() {
  /**
   * Load and validate game data from individual JSON files
   * This should be called during app initialization (before starting the game)
   */
  async loadData(): Promise<void> {
    try {
      const results = await Promise.all([
        fetch('/json/config/animations.json'),
        fetch('/json/config/assets.json'),
        fetch('/json/config/decorationsFrameMap.json'),
        fetch('/json/config/items.json'),
        fetch('/json/config/levelsIds.json'),
        fetch('/json/config/tilesFrameMap.json'),
      ]);

      if (results.some((res) => !res.ok)) {
        throw new Error('GameLoader: failed to load dynamic game data for schema validation.');
      }

      const [animationsResponse, assetsResponse, decorationsResponse, itemsResponse, levelsIdsResponse, tilesResponse] =
        results;

      const animationsData = await animationsResponse.json();
      const assetsData = await assetsResponse.json();
      const decorationsData = await decorationsResponse.json();
      const itemsData = await itemsResponse.json();
      const levelsIdsData = await levelsIdsResponse.json();
      const tilesData = await tilesResponse.json();

      const { schema: AnimationsSchema } = createAnimationsSchema(animationsData);
      const { schema: AssetsSchema } = createAssetsSchema(assetsData);
      const { schema: DecorationsSchema, decorationKeys } = createDecorationsFrameMapSchema(decorationsData);
      const { schema: ItemsSchema, itemKeys } = createItemsRegistrySchema(itemsData);
      const levelsIds = LevelsIdsSchema.parse(levelsIdsData);
      const { schema: TilesSchema, tileKeys } = createTilesFrameMapSchema(tilesData);

      const {
        loadAnimationsRegistry,
        loadAssetsRegistry,
        loadDecorationsFrameMapRegistry,
        loadItemsRegistry,
        loadLevelsIdsRegistry,
        loadTilesFrameMapRegistry,
      } = GameRegistry;

      loadAnimationsRegistry(AnimationsSchema.parse(animationsData));
      loadAssetsRegistry(AssetsSchema.parse(assetsData));
      loadDecorationsFrameMapRegistry(DecorationsSchema.parse(decorationsData));
      loadItemsRegistry(ItemsSchema.parse(itemsData));
      loadLevelsIdsRegistry(levelsIds);
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

          GameRegistry.loadLevel(levelId, validatedLevel);
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
        throw new Error('GameLoader: failed to load any levels');
      }
    } catch (criticalError) {
      console.error('Critical initialization error in GameLoader:', criticalError);
      throw criticalError;
    }
  }
}

// Singleton instance
export const GameLoader = new GameLoaderSingleton();
