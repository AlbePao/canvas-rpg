import { Resource } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type RodConfig = GameObjectBaseConfig;

export interface RodData {
  image: Resource;
  position: Vector2;
}
