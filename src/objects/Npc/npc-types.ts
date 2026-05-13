import type { TextContentConfig } from '../../lib/StoryFlags/storyFlags.types';
import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type NpcConfig = GameObjectBaseConfig & {
  textConfig: NpcTextConfig;
};

export interface NpcTextConfig {
  portraitFrame: number;
  content: TextContentConfig[];
}

export type NpcAnimationFrame = 'standing1' | 'standing2' | 'standing3' | 'standing4';
