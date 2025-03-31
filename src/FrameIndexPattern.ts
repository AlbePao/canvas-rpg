import { AnimationConfig } from './types/animationConfig';

export class FrameIndexPattern {
  currentTime = 0;
  animationConfig: AnimationConfig;
  duration: number;

  constructor(animationConfig: AnimationConfig) {
    this.animationConfig = animationConfig;
    this.duration = animationConfig.duration;
  }

  get frame() {
    const { frames } = this.animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }

    throw 'Time is before the first keyframe';
  }

  step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
