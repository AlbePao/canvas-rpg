import type { AnimationConfig } from './frameIndexPattern.types';

export class FrameIndexPattern {
  currentTime = 0;
  private readonly _animationConfig: AnimationConfig;
  private readonly _duration: number;

  constructor(config: AnimationConfig) {
    this._animationConfig = config;
    this._duration = config.duration;
  }

  get frame(): number {
    const { frames } = this._animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      const { time, frame } = frames[i];
      if (this.currentTime >= time) {
        return frame;
      }
    }

    throw new Error('FrameIndexPattern: time is before the first keyframe');
  }

  step(delta: number): void {
    this.currentTime += delta;
    if (this.currentTime >= this._duration) {
      this.currentTime = 0;
    }
  }
}
