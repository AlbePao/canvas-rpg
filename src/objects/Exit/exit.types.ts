import type { GameObjectConfig } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';
import type { Coords2D } from '../../types/coords';

interface ExitLevelData {
  newLevelId: string;
  heroNewPosition: Coords2D;
}

export type ExitConfig = GameObjectConfig & ExitLevelData;

export type ExitData = {
  id: string;
  position: Vector2;
} & ExitLevelData;
