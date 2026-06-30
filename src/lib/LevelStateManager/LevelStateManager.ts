import { Singleton } from '../Singleton';
import type { LevelObjectState, LevelsState, LevelState } from './levelStateManager.types';

// TODO: save also hero data in state to restore it when leaving a battle
class LevelStateManagerSingleton extends Singleton<LevelStateManagerSingleton>() {
  get state(): LevelsState {
    return this._state;
  }
  set state(state: LevelsState) {
    this._state = state;
  }
  private _state: LevelsState = {};

  private _getLevel(levelId: string): LevelState {
    let level = this._state[levelId];

    if (!level) {
      level = {};
      this._state[levelId] = level;
    }

    return level;
  }

  getObjectState(levelId: string, objectId: string): LevelObjectState | null {
    return this._getLevel(levelId)[objectId] ?? null;
  }

  setObjectState(levelId: string, objectId: string, state: LevelObjectState): void {
    const level = this._getLevel(levelId);
    const current = level[objectId];

    this._state[levelId][objectId] = {
      ...current,
      ...state,
    };
  }
}

export const LevelStateManager = LevelStateManagerSingleton.getInstance();
