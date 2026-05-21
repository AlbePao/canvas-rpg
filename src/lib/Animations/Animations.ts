import { objectKeys } from '../../helpers/objectKeys';
import type { FrameIndexPattern } from '../FrameIndexPattern';
import type { AnimationFrame, AnimationPattern } from './animations.types';

export class Animations {
  patterns: AnimationPattern;
  activeKey: AnimationFrame;
  isPaused = false;

  constructor(patterns: AnimationPattern) {
    this.patterns = patterns;
    this.activeKey = objectKeys(this.patterns)[0];
  }

  get frame(): number {
    return this._getCurrentFramePattern().frame;
  }

  play(key: AnimationFrame, startAtTime = 0): void {
    // Already playing this one
    if (this.activeKey === key) {
      return;
    }

    // Switch
    this.activeKey = key;
    this._getCurrentFramePattern().currentTime = startAtTime;
  }

  step(delta: number): void {
    if (this.isPaused) {
      return;
    }

    this._getCurrentFramePattern().step(delta);
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  private _getCurrentFramePattern(): FrameIndexPattern {
    const currentFramePattern = this.patterns[this.activeKey];

    if (!currentFramePattern) {
      throw new Error('Selected frame pattern does not exist');
    }

    return currentFramePattern;
  }
}
