import type { z } from 'zod';
import type { LevelMap } from '../../objects/LevelBuilder';
import type { LevelSchemas } from '../GameSchemas';
import { createLevelMapSchema } from '../GameSchemas';
import type { Registry } from '../Registry';
import type { ResourceFetcher } from './gameLoader.types';

export class LevelLoader {
  private _levelMapSchema: z.ZodType<LevelMap> | null = null;
  private readonly _pendingLoads = new Map<string, Promise<LevelMap>>();

  constructor(
    private readonly _fetcher: ResourceFetcher,
    private readonly _levels: Registry<LevelMap>,
  ) {}

  initialize(levelSchemas: LevelSchemas): void {
    this._levelMapSchema = createLevelMapSchema(levelSchemas);
  }

  async loadLevelsFromTitleScreen(startLevelIds: string[]): Promise<void> {
    await Promise.all([...new Set(startLevelIds)].map((levelId) => this._loadLevelNeighborhood(levelId)));
  }

  async prepareLevelTransition(fromLevelId: string, toLevelId: string): Promise<void> {
    await this.retainLevelNeighborhood(toLevelId, fromLevelId);
  }

  async retainLevelNeighborhood(levelId: string, previousLevelId?: string): Promise<void> {
    await this._loadLevelNeighborhood(levelId);

    const level = this._levels.get(levelId);
    const retainedLevelIds = new Set([levelId, ...this._getNeighboringLevelIds(level)]);

    if (previousLevelId) {
      retainedLevelIds.add(previousLevelId);
    }

    for (const registeredLevelId of this._levels.keys()) {
      if (!retainedLevelIds.has(registeredLevelId)) {
        this._levels.delete(registeredLevelId);
      }
    }
  }

  private async _loadLevelNeighborhood(levelId: string): Promise<void> {
    const level = await this._loadLevel(levelId);
    const neighboringLevelIds = this._getNeighboringLevelIds(level);

    await Promise.all(neighboringLevelIds.map((neighboringLevelId) => this._loadLevel(neighboringLevelId)));
  }

  private async _loadLevel(levelId: string): Promise<LevelMap> {
    const registeredLevel = this._levels.getOptional(levelId);

    if (registeredLevel) {
      return registeredLevel;
    }

    const pendingLoad = this._pendingLoads.get(levelId);

    if (pendingLoad) {
      return pendingLoad;
    }

    const loading = this._fetcher
      .fetchJson(`/json/levels/${levelId}.json`)
      .then((rawLevelData) => {
        const validatedLevel = this._getLevelMapSchema().parse(rawLevelData);

        if (validatedLevel.id !== levelId) {
          throw new Error(`Level ID mismatch: JSON has "${validatedLevel.id}" but expected "${levelId}"`);
        }

        this._levels.load({ [levelId]: validatedLevel });
        return validatedLevel;
      })
      .finally(() => {
        this._pendingLoads.delete(levelId);
      });

    this._pendingLoads.set(levelId, loading);
    return loading;
  }

  private _getLevelMapSchema(): z.ZodType<LevelMap> {
    if (!this._levelMapSchema) {
      throw new Error('LevelLoader has not been initialized with level schemas.');
    }

    return this._levelMapSchema;
  }

  private _getNeighboringLevelIds(level: LevelMap): string[] {
    return [
      ...new Set(
        level.gameObjects.flatMap((gameObject) => (gameObject.type === 'Exit' ? [gameObject.newLevelId] : [])),
      ),
    ].filter((levelId) => levelId !== level.id);
  }
}
