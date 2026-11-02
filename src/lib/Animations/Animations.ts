import type { FrameIndexPattern } from '../FrameIndexPattern';
import type { AnimationPattern } from './animations.types';

export class Animations {
  private _activeKey: string;
  private _isPaused = false;

  constructor(private readonly _patterns: AnimationPattern) {
    const [firstKey] = this._patterns.keys();
    this._activeKey = firstKey;
  }

  get frame(): number {
    return this._getCurrentFramePattern().frame;
  }

  play(key: string, startAtTime = 0): void {
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
    const currentFramePattern = this._patterns.get(this._activeKey);

    if (!currentFramePattern) {
      throw new Error('Animations: selected frame pattern does not exist');
    }

    return currentFramePattern;
  }
}
