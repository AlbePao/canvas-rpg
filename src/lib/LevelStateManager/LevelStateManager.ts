import { Singleton } from '../Singleton';
import type { LevelObjectState, LevelState } from './levelStateManager.types';

class LevelStateManagerSingleton extends Singleton<LevelStateManagerSingleton>() {
  private readonly _levels = new Map<string, LevelState>();

  private _getLevel(levelId: string): LevelState {
    let level = this._levels.get(levelId);

    if (!level) {
      level = new Map();
      this._levels.set(levelId, level);
    }

    return level;
  }

  getObjectState(levelId: string, objectId: string): LevelObjectState | null {
    return this._getLevel(levelId).get(objectId) ?? null;
  }

  setObjectState(levelId: string, objectId: string, state: LevelObjectState): void {
    const level = this._getLevel(levelId);

    const current = level.get(objectId) ?? {};

    level.set(objectId, {
      ...current,
      ...state,
    });
  }

  removeLevel(levelId: string): void {
    this._levels.delete(levelId);
  }

  clear(): void {
    this._levels.clear();
  }
}

export const LevelStateManager = LevelStateManagerSingleton.getInstance();
