import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { WallCoords, Walls } from '../../types/walls';
import { Vector2 } from '../../Vector2';
import { Hero } from '../Hero/Hero';

export type LevelConfig1 = Partial<{
  heroPosition: Vector2;
}>;
export type LevelConfig = { id: string } & LevelConfig1;

export class Level extends GameObject {
  heroStartPosition?: Vector2;
  background: Sprite | null = null;
  walls: Walls = new Set<WallCoords>();

  constructor({ id, heroPosition }: LevelConfig) {
    super({ id });

    if (heroPosition) {
      this.heroStartPosition = heroPosition;
      const hero = new Hero({
        id: 'hero',
        x: this.heroStartPosition.x,
        y: this.heroStartPosition.y,
      });
      this.addChild(hero);
    }
  }
}
