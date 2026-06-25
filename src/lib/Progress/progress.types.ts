import type { Coords2D } from '../../types/coords';
import type { Directions } from '../../types/directions';
import type { InventoryItems } from '../Inventory';

export interface ProgressData {
  levelId: string;
  storyFlags: string[];
  hero: {
    position: Coords2D;
    direction: Directions;
    inventory: InventoryItems;
  };
}
