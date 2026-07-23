export const DIRECTIONS = ['left', 'right', 'up', 'down'] as const;
export type Directions = (typeof DIRECTIONS)[number];
