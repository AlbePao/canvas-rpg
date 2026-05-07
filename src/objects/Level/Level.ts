import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { Coords, Walls } from '../../types/coords';
import { Vector2 } from '../../Vector2';
import { LevelBaseConfig } from './level.types';

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<Coords>();

  constructor({ id }: LevelBaseConfig) {
    super({ id });
  }
}
