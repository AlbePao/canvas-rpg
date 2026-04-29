import { GRID_SIZE } from '../constants';
import { WallCoords, Walls } from '../types/walls';

export const gridCells = (n: number) => {
  return n * GRID_SIZE;
};

export const isSpaceFree = (walls: Walls, x: number, y: number) => {
  // Convert to string for easy lookup
  const str: WallCoords = `${x},${y}`;
  // Check if walls has an entry at this spot
  const isWallPresent = walls.has(str);
  return !isWallPresent;
};
