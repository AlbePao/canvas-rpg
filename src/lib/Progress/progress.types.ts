import type { InventoryItems } from '../Inventory';
import type { LevelsState } from '../LevelStateManager';
import type { Coords2D } from '../Vector2';

export interface ProgressData {
  levelId: string;
  storyFlags: string[];
  levelsState: LevelsState;
  hero: {
    position: Coords2D;
    inventory: InventoryItems;
  };
}
