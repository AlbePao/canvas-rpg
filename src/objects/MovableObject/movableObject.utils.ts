import type { StandingFrame } from '../../lib/Animations';
import type { GameObject } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import { MovableObject } from './MovableObject';

/**
 * Duck-typed check: Hero and Npc both expose a `destinationPosition` used
 * to "reserve" a grid cell they're walking towards. Kept as a standalone
 * helper (rather than inlined at call sites) since it's also used by isPositionBlocked below.
 */
export function getMovableObjectDestination(child: GameObject): Vector2 | null {
  return child instanceof MovableObject ? child.destinationPosition : null;
}

/**
 * Checks whether a grid position is blocked by a solid body, or reserved by a movable object
 * (Hero/Npc) that is already heading there. Shared by Hero and Npc movement logic so both stay
 * decoupled from each other's concrete classes. Lives in `objects` (not `lib/Game`) so `lib`
 * never has to import concrete classes from `objects`.
 */
export function isPositionBlocked(children: GameObject[], x: number, y: number): boolean {
  return children.some((child) => {
    if (child.isSolid && child.position.x === x && child.position.y === y) {
      return true;
    }

    const reservedDestination = getMovableObjectDestination(child);
    return reservedDestination !== null && reservedDestination.x === x && reservedDestination.y === y;
  });
}

export function getStandingFrame(direction: Directions): StandingFrame {
  if (direction === 'UP') {
    return 'standUp';
  } else if (direction === 'LEFT') {
    return 'standLeft';
  } else if (direction === 'RIGHT') {
    return 'standRight';
  }

  return 'standDown';
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
