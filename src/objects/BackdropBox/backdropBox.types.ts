import type { GameObjectConfig } from '../../lib/GameObject';

export interface BackdropBoxConfig extends GameObjectConfig {
  width: number; // Width in grid cells (16px per cell)
  height: number; // Height in grid cells (16px per cell)
}
