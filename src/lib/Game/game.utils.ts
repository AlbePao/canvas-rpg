import type { Coords, Walls } from '../../types/coords';
import type { GameObject } from '../GameObject';
import type { Vector2 } from '../Vector2';
import { Game } from './Game';

export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function toGridSize(value: number): number {
  return value * Game.gridSize;
}

export function fromGridSize(value: number): number {
  return value / Game.gridSize;
}

export function detectOverlap(heroPosition: Vector2, objectPosition: Vector2): boolean {
  // detect overlap
  const roundedHeroX = Math.round(heroPosition.x);
  const roundedHeroY = Math.round(heroPosition.y);

  return roundedHeroX === objectPosition.x && roundedHeroY === objectPosition.y;
}

export function isSpaceFree(walls: Walls, x: number, y: number): boolean {
  // Convert to string for easy lookup
  const str: Coords = `${x},${y}`;
  // Check if walls has an entry at this spot
  const isWallPresent = walls.has(str);

  return !isWallPresent;
}

export function moveTowards(person: GameObject, destinationPosition: Vector2, speed: number): number {
  const distanceTravelX = destinationPosition.x - person.position.x;
  const distanceTravelY = destinationPosition.y - person.position.y;

  // Compare squared magnitudes first to avoid a sqrt call entirely on the (common) arrival frame
  const distanceSquared = distanceTravelX * distanceTravelX + distanceTravelY * distanceTravelY;

  if (distanceSquared <= speed * speed) {
    // If we're close enough, just move directly to the destination
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
    return 0;
  }

  // Only pay for sqrt once we know normalization is actually needed
  const distance = Math.sqrt(distanceSquared);
  const normalizedX = distanceTravelX / distance;
  const normalizedY = distanceTravelY / distance;

  person.position.x += normalizedX * speed;
  person.position.y += normalizedY * speed;

  /**
   * Moving by `speed` along the normalized direction reduces the distance by
   * exactly `speed` (the normalized vector has magnitude 1), so no second sqrt is needed to get the remainder.
   */
  return distance - speed;
}
