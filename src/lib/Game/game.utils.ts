import { GRID_SIZE } from './game.constants';

export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function toGridSize(value: number): number {
  return value * GRID_SIZE;
}

export function fromGridSize(value: number): number {
  return value / GRID_SIZE;
}

export function checkDuplicateIds(gameObjects: { id: string }[]): boolean {
  const seenIds = new Set<string>();
  const hasDuplicatedIds = gameObjects.some(({ id }) => {
    if (seenIds.has(id)) {
      return true;
    }
    seenIds.add(id);
    return false;
  });

  return hasDuplicatedIds;
}
