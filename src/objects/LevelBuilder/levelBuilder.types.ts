import type { Coords2D } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import type { ChestConfig } from '../Chest';
import type { DecorationConfig } from '../Decoration';
import type { ExitConfig } from '../Exit';
import type { CollectibleItemConfig } from '../Item';
import type { GridCoords, LevelConfig } from '../Level';
import type { NpcConfig } from '../Npc';

export type LevelBuilderConfig = LevelConfig & {
  heroFacingDirection?: Directions;
};

export type LevelCollectibleItem = CollectibleItemConfig & {
  type: 'CollectibleItem';
};

export type LevelChestItem = ChestConfig & {
  type: 'Chest';
};

export type LevelNpc = NpcConfig & {
  type: 'Npc';
};

export type LevelDecoration = DecorationConfig & {
  type: 'Decoration';
};

export type LevelExit = ExitConfig & {
  type: 'Exit';
};

export type LevelObjects = LevelCollectibleItem | LevelChestItem | LevelNpc | LevelDecoration | LevelExit;

export interface LevelBackground {
  resource: string;
  frameSize: Coords2D;
}

export interface LevelMap {
  id: string;
  background?: LevelBackground;
  heroDefaultPosition: Coords2D;
  gameObjects: LevelObjects[];
  walls: GridCoords[];
  tiles: Record<GridCoords, string | null>;
}
