interface AnimationFrame {
  time: number;
  frame: number;
}

export interface AnimationConfig {
  duration: number;
  frames: AnimationFrame[];
}
