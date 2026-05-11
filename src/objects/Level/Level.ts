import { GameObject } from '../../lib/GameObject';
import { Sprite } from '../../lib/Sprite';
import { Vector2 } from '../../lib/Vector2';
import { Coords, Walls } from '../../types/coords';
import { LevelConfig } from './level.types';

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<Coords>();

  constructor({ id }: LevelConfig) {
    if (!id) {
      throw new Error('Level must have an id');
    }

    super({ id });
  }
}
