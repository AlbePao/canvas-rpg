import { GameObject } from '../../lib/GameObject';
import { Sprite } from '../../lib/Sprite';
import { Vector2 } from '../../lib/Vector2';
import { Coords, Walls } from '../../types/coords';
import { LevelBaseConfig } from './level.types';

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<Coords>();

  constructor({ id }: LevelBaseConfig) {
    super({ id });
  }
}
