import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type EnemyConfig = GameObjectBaseConfig & {
  health?: number;
};

export type EnemyAnimationFrame = 'hover1' | 'hover2' | 'hover3' | 'hover4' | 'hit1' | 'hit2';
