import { Singleton } from '../Singleton';
import { ConfigLoader } from './ConfigLoader';
import type { LevelLoadResult } from './gameLoader.types';
import { LevelLoader } from './LevelLoader';
import { HttpResourceFetcher } from './ResourceFetcher';

/**
 * GameLoader: Dynamically loads and validates game data definitions from individual JSON files
 * Each definition has its own JSON file in public/json/
 * Provides type-safe access to all available data definitions through GameRegistry
 */
class GameLoaderSingleton extends Singleton<GameLoaderSingleton>() {
  private readonly _fetcher = new HttpResourceFetcher();
  private readonly _configLoader = new ConfigLoader(this._fetcher);
  private readonly _levelLoader = new LevelLoader(this._fetcher);

  /**
   * Load and validate game data from individual JSON files
   * This should be called during app initialization (before starting the game)
   */
  async loadData(): Promise<void> {
    try {
      // 1. Load and validate global game configuration
      const { levelSchemas } = await this._configLoader.loadAll();

      // 2. Load and validate all levels based on the loaded level schemas
      const levelResults = await this._levelLoader.loadLevels(levelSchemas);

      // 3. Process level loading results and handle any warnings or errors
      this._processLevelResults(levelResults, levelSchemas.levelsIds.length);
    } catch (criticalError) {
      console.error('Critical initialization error in GameLoader:', criticalError);
      throw criticalError;
    }
  }

  /**
   * Process level loading results and handle any warnings or errors
   */
  private _processLevelResults(results: LevelLoadResult[], totalLevels: number): void {
    const successCount = results.filter((r) => r.success).length;
    const failures = results.filter((r) => !r.success);

    if (failures.length > 0) {
      console.warn(`Loaded ${successCount}/${totalLevels} levels`);
      failures.forEach((failure) => {
        console.warn(`${failure.id}: ${failure.error}`);
      });
    }

    if (successCount === 0) {
      throw new Error('GameLoader: failed to load any levels');
    }
  }
}

// Singleton instance
export const GameLoader = new GameLoaderSingleton();
