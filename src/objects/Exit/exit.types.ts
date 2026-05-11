import type { Vector2 } from '../../lib/Vector2';
import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type ExitConfig = GameObjectBaseConfig;

export interface ExitData {
  id: string;
  position: Vector2;
}
