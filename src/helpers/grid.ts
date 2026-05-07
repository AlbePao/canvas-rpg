import { GRID_SIZE } from '../constants/gridSize';
import { Coords, Walls } from '../types/coords';

export const gridCells = (n: number) => {
  return n * GRID_SIZE;
};

export const isSpaceFree = (walls: Walls, x: number, y: number) => {
  // Convert to string for easy lookup
  const str: Coords = `${x},${y}`;
  // Check if walls has an entry at this spot
  const isWallPresent = walls.has(str);
  return !isWallPresent;
};
