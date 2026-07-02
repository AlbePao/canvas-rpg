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
    if (child.id === 'tilesetLevel-hero') {
      console.log(child.isSolid, child.position.x, child.position.y, x, y);
    }
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
  }
  if (direction === 'LEFT') {
    return 'standLeft';
  }
  if (direction === 'RIGHT') {
    return 'standRight';
  }

  return 'standDown';
}
