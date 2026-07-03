import type { LevelTileName } from '../../lib/Tileset';
import type { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';

export type LevelTileHeroBehaviorDirection = Directions | 'facingDirection';

export type LevelTileHeroBehavior =
  | {
      behavior: 'jump';
      direction?: never;
      speed?: never;
    }
  | {
      behavior: 'move' | 'spin' | 'slide';
      direction: LevelTileHeroBehaviorDirection;
      speed?: number;
    };

export interface LevelTileConfig {
  id: string;
  tileName: LevelTileName;
  position: Vector2;
  heroBehavior?: LevelTileHeroBehavior;
}
