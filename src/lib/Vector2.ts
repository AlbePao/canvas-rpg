import type { Coords2D, TileCoords } from '../types/coords';
import type { Directions } from '../types/directions';
import { Game } from './Game';

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

    if (direction === 'LEFT') {
      x -= Game.gridSize;
    }
    if (direction === 'RIGHT') {
      x += Game.gridSize;
    }
    if (direction === 'UP') {
      y -= Game.gridSize;
    }
    if (direction === 'DOWN') {
      y += Game.gridSize;
    }

    return [x, y];
  }
}
