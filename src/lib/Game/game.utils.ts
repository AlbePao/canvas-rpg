import { GRID_SIZE } from './game.constants';

// Keys that must never be used in `obj[key] = value` assignments built from external/JSON-sourced
// data, since they can repoint an object's own prototype (or shadow Object.prototype members).
const UNSAFE_OBJECT_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Parses a JSON string like `JSON.parse`, dropping any `__proto__`/`constructor`/`prototype`
 * keys to prevent prototype pollution when the source is untrusted (e.g. browser storage).
 */
export function safeJsonParse<T>(value: string): T {
  return JSON.parse(value, (key, val: unknown) => (UNSAFE_OBJECT_KEYS.has(key) ? undefined : val)) as T;
}

export function isUnsafeObjectKey(key: string): boolean {
  return UNSAFE_OBJECT_KEYS.has(key);
}

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
