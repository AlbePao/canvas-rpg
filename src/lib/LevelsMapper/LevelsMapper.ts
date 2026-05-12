import { Singleton } from '../Singleton';
import type { LevelMapJsonType } from './levelMapSchema';
import { LevelMapJsonSchema, LEVELS_IDS } from './levelMapSchema';

interface LoadLevelResult {
  id: string;
  success: boolean;
  error?: string;
}

/**
 * LevelsMapper: Dynamically loads and validates level definitions from individual JSON files
 * Each level has its own JSON file in public/json/{levelId}.json
 * Provides type-safe access to all available levels
 */
class LevelsMapperSingleton extends Singleton<LevelsMapperSingleton>() {
  private readonly _levels = new Map<string, LevelMapJsonType>();
  private _isLoaded = false;

  /**
   * Load and validate all levels from individual JSON files
   * This should be called during app initialization (before starting the game)
   */
  async loadLevels(): Promise<void> {
    const loadResults: LoadLevelResult[] = [];

    // TODO: load level ids from a global config
    for (const levelId of LEVELS_IDS) {
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

        const data = await response.json();

        // Validate the JSON structure against schema
        const validatedLevel = LevelMapJsonSchema.parse(data);

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
    const totalCount = LEVELS_IDS.length;

    if (failureCount > 0) {
      console.warn(`Loaded ${successCount}/${totalCount} levels`);
      loadResults.forEach((result) => {
        if (!result.success) {
          console.warn(`${result.id}: ${result.error}`);
        }
      });
    } else {
      console.log(`Loaded ${successCount} levels from JSON`);
    }

    if (successCount === 0) {
      throw new Error('Failed to load any levels');
    }

    this._isLoaded = true;
  }

  /**
   * Get a specific level by ID
   * Returns null if the level doesn't exist
   */
  getLevel(id: string): LevelMapJsonType | null {
    if (!this._isLoaded) {
      throw new Error('Levels not loaded yet. Call loadLevels() during app initialization.');
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
      throw new Error('Levels not loaded yet. Call loadLevels() during app initialization.');
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
