import type { Coords2D } from '../../types/coords';
import type { InventoryItems } from '../Inventory';
import type { LevelsState } from '../LevelStateManager';

export interface ProgressData {
  levelId: string;
  storyFlags: string[];
  levelsState: LevelsState;
  hero: {
    position: Coords2D;
    inventory: InventoryItems;
  };
}
