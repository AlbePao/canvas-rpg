import type { GameObject } from '../lib/GameObject';
import { Hero } from '../objects/Hero';

export function isHeroObject(object: GameObject): object is Hero {
  return object instanceof Hero;
}

export function getHeroSiblingObject(gameObject: GameObject | null): Hero | null {
  return gameObject?.children.find((child) => isHeroObject(child)) ?? null;
}
