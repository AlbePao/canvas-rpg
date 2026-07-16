import type { GameObjectConfig } from '../../lib/GameObject';
import type { Coords2D, Vector2 } from '../../lib/Vector2';

interface ExitLevelData {
  newLevelId: string;
  newHeroPosition: Coords2D;
}

export type ExitConfig = GameObjectConfig & ExitLevelData;

export type ExitData = {
  id: string;
  position: Vector2;
} & ExitLevelData;
