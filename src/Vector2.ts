import { GRID_SIZE } from './constants/gridSize';
import { Directions } from './Input';

export class Vector2 {
  x = 0;
  y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new Vector2(this.x, this.y);
  }

  matches(otherVector2: Vector2) {
    return this.x === otherVector2.x && this.y === otherVector2.y;
  }

  toNeighbor(direction: Directions) {
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
