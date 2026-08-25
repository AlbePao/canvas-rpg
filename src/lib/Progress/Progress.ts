import { safeJsonParse } from '../Game';
import { Singleton } from '../Singleton';
import type { ProgressData } from './progress.types';

const SAVE_FILE_KEY = 'saveData';

class ProgressSingleton extends Singleton<ProgressSingleton>() {
  private readonly _storage = window.localStorage;

  save(data: ProgressData): void {
    this._storage.setItem(SAVE_FILE_KEY, JSON.stringify(data));
  }

  get saveFile(): ProgressData | null {
    const saveFile = this._storage.getItem(SAVE_FILE_KEY);
    return saveFile ? safeJsonParse<ProgressData>(saveFile) : null;
  }
}

export const Progress = ProgressSingleton.getInstance();
