import type { GameObject } from '../lib/GameObject';
import type { Vector2 } from '../lib/Vector2';

export function moveTowards(person: GameObject, destinationPosition: Vector2, speed: number): number {
  const distanceTravelX = destinationPosition.x - person.position.x;
  const distanceTravelY = destinationPosition.y - person.position.y;

  // Calculate distance once (using square formula directly)
  const distance = Math.sqrt(distanceTravelX * distanceTravelX + distanceTravelY * distanceTravelY);

  if (distance <= speed) {
    // If we're close enough, just move directly to the destination
    person.position.x = Math.floor(destinationPosition.x);
    person.position.y = Math.floor(destinationPosition.y);
    return 0;
  }

  // Normalize and move by speed
  const normalizedX = distanceTravelX / distance;
  const normalizedY = distanceTravelY / distance;

  person.position.x += Math.floor(normalizedX * speed);
  person.position.y += Math.floor(normalizedY * speed);

  // Return remaining distance without recalculation
  const remainingX = destinationPosition.x - person.position.x;
  const remainingY = destinationPosition.y - person.position.y;
  return Math.sqrt(remainingX * remainingX + remainingY * remainingY);
}
