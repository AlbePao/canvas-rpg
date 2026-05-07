import { FrameIndexPattern } from './FrameIndexPattern';
import { objectKeys } from './helpers/objectKeys';

export type AnimationPattern<T extends string | number | symbol> = Record<T, FrameIndexPattern>;

export class Animations<T extends string | number | symbol> {
  patterns: AnimationPattern<T>;
  activeKey: T;

  constructor(patterns: AnimationPattern<T>) {
    this.patterns = patterns;
    this.activeKey = objectKeys(this.patterns)[0];
  }

  get frame(): number {
    return this.patterns[this.activeKey].frame;
  }

  play(key: T, startAtTime = 0): void {
    // Already playing this one
    if (this.activeKey === key) {
      return;
    }

    // Switch
    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta: number): void {
    this.patterns[this.activeKey].step(delta);
  }
}
