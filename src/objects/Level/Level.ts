import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { WallCoords, Walls } from '../../types/walls';
import { Vector2 } from '../../Vector2';

export type LevelConfig = Partial<{
  heroPosition: Vector2;
}>;

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<WallCoords>();

  // TODO: handle hero start position here
  constructor() {
    super({});
  }
}
