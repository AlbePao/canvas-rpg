import type { TextConfig } from '../../lib/StoryFlags/storyFlags.types';
import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type InteractiveObjectConfig = GameObjectBaseConfig & {
  textConfig?: TextConfig;
};
