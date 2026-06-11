import { GRID_SIZE } from '../constants/gridSize';
import type { Coords, Walls } from '../types/coords';

// TODO: move gridCells into Game class and GRID_SIZE into Game class config
export const gridCells = (n: number): number => n * GRID_SIZE;

export const isSpaceFree = (walls: Walls, x: number, y: number): boolean => {
  // Convert to string for easy lookup
  const str: Coords = `${x},${y}`;
  // Check if walls has an entry at this spot
  const isWallPresent = walls.has(str);
  return !isWallPresent;
};
