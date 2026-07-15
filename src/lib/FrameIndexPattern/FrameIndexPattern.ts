import type { AnimationConfig, FrameData } from './frameIndexPattern.types';

export class FrameIndexPattern {
  currentTime = 0;
  private readonly _frames: FrameData[];
  private readonly _duration: number;

  constructor(config: AnimationConfig) {
    const { duration, frames } = config;
    this._frames = frames;
    this._duration = duration;
  }

  get frame(): number {
    for (let i = this._frames.length - 1; i >= 0; i--) {
      const { time, frame } = this._frames[i];
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
