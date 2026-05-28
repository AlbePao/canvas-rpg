import type { LevelTileName } from '../../lib/LevelBuilder/tileset.types';
import type { Vector2 } from '../../lib/Vector2';

// TODO: extract related logic to set hero behavior programmatically
// TODO: hero can jump over the ledge, like in pokemon
// TODO: behavior directions are IN_PLACE, FORWARDS (facing direction + 1), BACKWARDS (facing direction - 1)
export interface LevelTileHeroBehavior {
  behavior: 'jump' | 'move' | 'spin';
  direction: 'IN_PLACE' | 'FORWARDS' | 'BACKWARDS';
  speed?: number;
}

export interface LevelTileConfig {
  id: string;
  tileName: LevelTileName;
  position: Vector2;
  reflectUpperCell?: boolean;
  reflectChildren?: boolean;
  heroBehavior?: LevelTileHeroBehavior;
}
