import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type EnemyConfig = GameObjectBaseConfig & {
  health?: number;
};

const ANIMATION_FRAMES = ['hover1', 'hover2', 'hover3', 'hover4', 'hit1', 'hit2'] as const;

export type EnemyAnimationFrame = (typeof ANIMATION_FRAMES)[number];
