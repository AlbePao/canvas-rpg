import type { StandingFrame } from '../../lib/Animations';
import type { GameObject } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';

export function getStandingFrame(direction: Directions): StandingFrame {
  if (direction === 'up') {
    return 'standUp';
  } else if (direction === 'left') {
    return 'standLeft';
  } else if (direction === 'right') {
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
