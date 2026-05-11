import { GRID_SIZE } from '../constants/gridSize';
import { Coords2D } from '../types/coords';
import { Directions } from '../types/directions';

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

  matches(otherVector2: Vector2): boolean {
    return this.x === otherVector2.x && this.y === otherVector2.y;
  }

  toNeighbor(direction: Directions): Vector2 {
    let { x, y } = this;

    if (direction === 'LEFT') {
      x -= GRID_SIZE;
    }
    if (direction === 'RIGHT') {
      x += GRID_SIZE;
    }
    if (direction === 'UP') {
      y -= GRID_SIZE;
    }
    if (direction === 'DOWN') {
      y += GRID_SIZE;
    }

    return new Vector2(x, y);
  }
}
