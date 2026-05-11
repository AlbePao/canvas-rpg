import type { Resource } from '../../lib/Resources';
import type { Vector2 } from '../../lib/Vector2';
import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type RodConfig = GameObjectBaseConfig;

export interface RodData {
  image: Resource;
  position: Vector2;
}
