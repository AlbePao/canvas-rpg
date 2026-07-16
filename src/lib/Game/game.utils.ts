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
