import type { AnimationConfig } from '../types/animationConfig';

export class FrameIndexPattern {
  currentTime = 0;
  animationConfig: AnimationConfig;
  duration: number;

  constructor(animationConfig: AnimationConfig) {
    this.animationConfig = animationConfig;
    this.duration = animationConfig.duration;
  }

  get frame(): number {
    const { frames } = this.animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      const { time, frame } = frames[i];
      if (this.currentTime >= time) {
        return frame;
      }
    }

    throw new Error('Time is before the first keyframe');
  }

  step(delta: number): void {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
