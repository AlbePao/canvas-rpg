import { GameRegistry } from '../GameRegistry';
import { Singleton } from '../Singleton';
import { ConfigLoader } from './ConfigLoader';
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
  private readonly _levelLoader = new LevelLoader(this._fetcher, GameRegistry.levels);

  async loadData(): Promise<void> {
    const { levelSchemas } = await this._configLoader.loadAll();
    this._levelLoader.initialize(levelSchemas);
  }

  async prepareLevelsFromTitleScreen(startLevelIds: string[]): Promise<void> {
    await this._levelLoader.loadLevelsFromTitleScreen(startLevelIds);
  }

  async retainLevelNeighborhood(levelId: string): Promise<void> {
    await this._levelLoader.retainLevelNeighborhood(levelId);
  }

  async prepareLevelTransition(fromLevelId: string, toLevelId: string): Promise<void> {
    await this._levelLoader.prepareLevelTransition(fromLevelId, toLevelId);
  }
}

// Singleton instance
export const GameLoader = new GameLoaderSingleton();
