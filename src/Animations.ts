import { FrameIndexPattern } from './FrameIndexPattern';

const ANIMATION_FRAMES = [
  'walkDown',
  'walkUp',
  'walkLeft',
  'walkRight',
  'standDown',
  'standUp',
  'standLeft',
  'standRight',
  'pickUpDown',
] as const;

type AnimationFrame = (typeof ANIMATION_FRAMES)[number];

export type AnimationPattern = Record<AnimationFrame, FrameIndexPattern>;

const objectKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

export class Animations {
  patterns: AnimationPattern;
  activeKey: AnimationFrame;

  constructor(patterns: AnimationPattern) {
    this.patterns = patterns;
    this.activeKey = objectKeys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: AnimationFrame, startAtTime = 0) {
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
