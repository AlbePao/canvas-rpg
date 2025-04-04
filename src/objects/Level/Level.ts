import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { WallCoords, Walls } from '../../types/walls';

export class Level extends GameObject {
  background: Sprite | null = null;
  walls: Walls = new Set<WallCoords>();

  constructor() {
    super({});
  }
}
