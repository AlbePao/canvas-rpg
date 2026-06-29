import type { Coords2D } from '../../types/coords';
import type { Directions } from '../../types/directions';
import type { InventoryItems } from '../Inventory';
import type { LevelsState } from '../LevelStateManager';

export interface ProgressData {
  levelId: string;
  storyFlags: string[];
  levelsState: LevelsState;
  hero: {
    position: Coords2D;
    direction: Directions;
    inventory: InventoryItems;
  };
}
