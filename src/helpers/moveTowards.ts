import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';

export function moveTowards(person: Sprite, destinationPosition: Vector2, speed: number) {
  let distanceTravelX = destinationPosition.x - person.position.x;
  let distanceTravelY = destinationPosition.y - person.position.y;

  let distance = Math.sqrt(distanceTravelX ** 2 + distanceTravelY ** 2);

  if (distance <= speed) {
    // If we're close enough, just move directly to the destination
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
  } else {
    // Otherwise, move by the specified speed in the direction of the destination
    let normalizedX = distanceTravelX / distance;
    let normalizedY = distanceTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    // Recalculate remaining distance after the move
    distanceTravelX = destinationPosition.x - person.position.x;
    distanceTravelY = destinationPosition.y - person.position.y;
    distance = Math.sqrt(distanceTravelX ** 2 + distanceTravelY ** 2);
  }

  return distance;
}
