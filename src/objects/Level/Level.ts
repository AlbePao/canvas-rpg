import { GameObject } from '../../lib/GameObject';
import type { Coords2D } from '../../lib/Vector2';
import type { Sprite } from '../Sprite';
import type { GridCoords, LevelConfig, Walls } from './level.types';

// This class can be used to create a new level or to instance a new level from a config passed to LevelBuilder
export class Level extends GameObject {
  heroStartPosition?: Coords2D;
  background: Sprite | null = null;
  readonly walls: Walls = new Set<GridCoords>();

  constructor({ id }: LevelConfig) {
    if (!id) {
      throw new Error('Level: id is missing');
    }

    super({
      id,
    });
  }
}
