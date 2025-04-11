import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { WallCoords, Walls } from '../../types/walls';
import { Vector2 } from '../../Vector2';
import { Hero } from '../Hero/Hero';

export type LevelConfig = Partial<{
  heroPosition: Vector2;
}>;

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<WallCoords>();

  constructor(config: LevelConfig) {
    super({});

    if (config.heroPosition) {
      this.heroStartPosition = config.heroPosition;
      const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
      this.addChild(hero);
    }
  }
}
