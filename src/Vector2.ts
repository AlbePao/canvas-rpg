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
      x -= 16;
    }
    if (direction === 'RIGHT') {
      x += 16;
    }
    if (direction === 'UP') {
      y -= 16;
    }
    if (direction === 'DOWN') {
      y += 16;
    }

    return new Vector2(x, y);
  }
}
