import type { GameObjectConfig } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';

export type ExitConfig = GameObjectConfig;

export interface ExitData {
  id: string;
  position: Vector2;
}
