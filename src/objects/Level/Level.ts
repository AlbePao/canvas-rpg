import { GameObject } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';
import type { Coords, Walls } from '../../types/coords';
import type { Sprite } from '../Sprite';
import type { LevelConfig } from './level.types';

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<Coords>();

  constructor({ id }: LevelConfig) {
    if (!id) {
      throw new Error('Level: id is missing');
    }

    super({ id });
  }
}
