import { objectKeys } from '../../helpers/objectKeys';
import type { FrameIndexPattern } from '../FrameIndexPattern';
import type { AnimationFrame, AnimationPattern } from './animations.types';

export class Animations {
  private readonly _patterns: AnimationPattern;
  private _activeKey: AnimationFrame;
  private _isPaused = false;

  constructor(patterns: AnimationPattern) {
    this._patterns = patterns;
    this._activeKey = objectKeys(this._patterns)[0];
  }

  get frame(): number {
    return this._getCurrentFramePattern().frame;
  }

  play(key: AnimationFrame, startAtTime = 0): void {
    // Already playing this one
    if (this._activeKey === key) {
      return;
    }

    // Switch
    this._activeKey = key;
    this._getCurrentFramePattern().currentTime = startAtTime;
  }

  step(delta: number): void {
    if (this._isPaused) {
      return;
    }

    this._getCurrentFramePattern().step(delta);
  }

  pause(): void {
    this._isPaused = true;
  }

  resume(): void {
    this._isPaused = false;
  }

  private _getCurrentFramePattern(): FrameIndexPattern {
    const currentFramePattern = this._patterns[this._activeKey];

    if (!currentFramePattern) {
      throw new Error('Animations: selected frame pattern does not exist');
    }

    return currentFramePattern;
  }
}
