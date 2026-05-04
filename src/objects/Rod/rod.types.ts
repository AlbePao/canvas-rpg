import { Resource } from '../../Resource';
import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import { Vector2 } from '../../Vector2';

export type RodConfig = GameObjectBaseConfig;

export interface RodData {
  image: Resource;
  position: Vector2;
}
