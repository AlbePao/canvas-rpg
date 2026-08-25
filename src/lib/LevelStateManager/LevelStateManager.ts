import { isUnsafeObjectKey } from '../Game';
import { Singleton } from '../Singleton';
import type { LevelObjectState, LevelsState, LevelsStateMap, LevelStateMap } from './levelStateManager.types';

class LevelStateManagerSingleton extends Singleton<LevelStateManagerSingleton>() {
  get state(): LevelsState {
    const serialized: LevelsState = {};

    this._state.forEach((levelMap, levelId) => {
      if (isUnsafeObjectKey(levelId)) {
        return;
      }

      serialized[levelId] = Object.fromEntries(levelMap.entries());
    });

    return serialized;
  }
  set state(state: LevelsState) {
    this._state = new Map(
      Object.entries(state)
        .filter(([levelId]) => !isUnsafeObjectKey(levelId))
        .map(([levelId, levelObj]) => [levelId, new Map(Object.entries(levelObj))]),
    );
  }
  private _state: LevelsStateMap = new Map();

  private _getLevel(levelId: string): LevelStateMap {
    let level = this._state.get(levelId);

    if (!level) {
      level = new Map();
      this._state.set(levelId, level);
    }

    return level;
  }

  getObjectState(levelId: string, objectId: string): LevelObjectState | null {
    return this._getLevel(levelId).get(objectId) ?? null;
  }

  setObjectState(levelId: string, objectId: string, state: LevelObjectState): void {
    const level = this._getLevel(levelId);
    const current = level.get(objectId);

    level.set(objectId, {
      ...current,
      ...state,
    });
  }
}

export const LevelStateManager = LevelStateManagerSingleton.getInstance();
