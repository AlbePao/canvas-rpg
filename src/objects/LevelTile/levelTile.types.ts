import type { LevelTileName } from '../../lib/LevelBuilder/tileset.types';
import type { Vector2 } from '../../lib/Vector2';

export interface LevelTileConfig {
  id: string;
  tileName: LevelTileName;
  position: Vector2;
  reflectUpperObjects?: boolean;
  reflectChildren?: boolean;
  behavior?: {
    moveDirection: 'IN_PLACE' | 'FORWARDS' | 'BACKWARDS';
    heroBehavior: 'jump' | 'move' | 'spin';
    speed?: number;
  };
}
