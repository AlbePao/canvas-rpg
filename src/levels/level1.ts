import { Walls } from '../types/walls';

export const walls: Walls = new Set<`${string},${string}`>();

walls.add('64,48'); // Tree

walls.add('64,64'); // Square
walls.add('64,80');
walls.add('80,64');
walls.add('80,80');

walls.add('112,80'); // Water
walls.add('128,80');
walls.add('144,80');
walls.add('160,80');
