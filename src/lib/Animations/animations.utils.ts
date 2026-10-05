import {
  ANIMATION_COLLECT_FRAMES,
  ANIMATION_STANDING_FRAMES,
  ANIMATION_WALKING_FRAMES,
  type AnimationFrame,
} from './animations.types';

export function isAnimationFrameKey(key: string): key is AnimationFrame {
  return key in ANIMATION_STANDING_FRAMES || key in ANIMATION_WALKING_FRAMES || key in ANIMATION_COLLECT_FRAMES;
}
