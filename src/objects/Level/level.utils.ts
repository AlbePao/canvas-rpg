import type { Walls } from './level.types';

export function isSpaceFree(x: number, y: number, walls?: Walls): boolean {
  // Check if walls has an entry at this spot
  const isWallPresent = walls?.has(`${x},${y}`) ?? false;

  return !isWallPresent;
}
