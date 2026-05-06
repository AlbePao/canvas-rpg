import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { WallCoords, Walls } from '../../types/walls';
import { Vector2 } from '../../Vector2';
import { LevelBaseConfig } from './level.types';

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<WallCoords>();

  constructor({ id }: LevelBaseConfig) {
    super({ id });
  }
}
