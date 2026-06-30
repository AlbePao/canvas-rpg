export const DIRECTIONS = ['LEFT', 'RIGHT', 'UP', 'DOWN'] as const;
export type Directions = (typeof DIRECTIONS)[number];
