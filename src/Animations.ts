import { FrameIndexPattern } from './FrameIndexPattern';

export type AnimationPattern = Record<string, FrameIndexPattern>;

export class Animations {
  patterns: AnimationPattern;
  activeKey: string;

  constructor(patterns: AnimationPattern) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: string, startAtTime = 0) {
    // Already playing this one
    if (this.activeKey === key) {
      return;
    }

    // Switch
    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta: number) {
    this.patterns[this.activeKey].step(delta);
  }
}
