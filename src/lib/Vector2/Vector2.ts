import type { Directions } from '../../types/directions';
import { GRID_SIZE } from '../Game';
import type { Coords2D, TileCoords } from './vector2.types';

export class Vector2 implements Coords2D {
  x = 0;
  y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  duplicate(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  matches([x, y]: TileCoords): boolean {
    return this.x === x && this.y === y;
  }

  toNeighborCoords(direction: Directions): TileCoords {
    let { x, y } = this;

    if (direction === 'left') {
      x -= GRID_SIZE;
    } else if (direction === 'right') {
      x += GRID_SIZE;
    } else if (direction === 'up') {
      y -= GRID_SIZE;
    } else if (direction === 'down') {
      y += GRID_SIZE;
    }

    return [x, y];
  }
}
