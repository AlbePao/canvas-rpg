export interface FrameData {
  time: number;
  frame: number;
}

export interface AnimationConfig {
  duration: number;
  frames: FrameData[];
}
