import type { ChestConfig } from '../../objects/Chest';
import type { DecorationConfig } from '../../objects/Decoration';
import type { ExitConfig } from '../../objects/Exit';
import type { CollectibleItemConfig } from '../../objects/Item';
import type { LevelConfig } from '../../objects/Level';
import type { NpcConfig } from '../../objects/Npc';
import type { Coords, Coords2D } from '../../types/coords';
import type { BgKey } from '../Resources';
import type { LevelTileName } from './tileset.types';

export type LevelsId = 'tilesetLevel' | 'tilesetLevel2';

export type LevelBuilderConfig = LevelConfig & {
  id: string;
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
  resource: BgKey;
  frameSize: Coords2D;
}

export interface LevelMap {
  id: string;
  background?: LevelBackground;
  heroDefaultPosition: Coords2D;
  gameObjects: LevelObjects[];
  walls: Coords[];
  tiles: Record<Coords, LevelTileName | null>;
}
