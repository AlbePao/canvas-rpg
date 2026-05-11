import type { Vector2 } from '../lib/Vector2';

export function detectOverlap(heroPosition: Vector2, objectPosition: Vector2): boolean {
  // detect overlap
  const roundedHeroX = Math.round(heroPosition.x);
  const roundedHeroY = Math.round(heroPosition.y);

  return roundedHeroX === objectPosition.x && roundedHeroY === objectPosition.y;
}
