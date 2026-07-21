import type { DecorationFrames } from '../../objects/Decoration';
import type { AnimationFrame } from '../Animations';
import type { AnimationConfig } from '../FrameIndexPattern';
import type { LevelMap } from '../LevelBuilder';
import type { Coords2D, Vector2 } from '../Vector2';

export const ITEM_TYPES = ['equipable', 'consumable'] as const;
export type ItemType = (typeof ITEM_TYPES)[number];

export interface ItemData {
  itemKey: string;
  name: string;
  type: ItemType;
  frame: number;
}

export type AssetData = {
  src: string;
} & Partial<{
  frameSize: Coords2D;
  position: Coords2D;
  hFrames: number;
  vFrames: number;
}>;

export type AssetLoaded = Pick<AssetData, 'hFrames' | 'vFrames'> & {
  frameSize?: Vector2;
  position?: Vector2;
  resource: AssetResource;
};

export interface AssetResource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

export type AssetsToLoad = Record<string, AssetData>;
export type AssetsRegistry = Record<string, AssetLoaded>;

export const NPC_KEYS = ['ow1', 'ow2', 'ow3', 'ow4', 'ow5', 'ow6', 'ow7', 'ow8', 'ow9', 'ow10'] as const;
export type NpcKey = (typeof NPC_KEYS)[number];

export const WORLD_BACKGROUNDS = ['bgBeach', 'bgSnow', 'bgWoods'] as const;
export type BgKey = (typeof WORLD_BACKGROUNDS)[number];

export type ResourceKey =
  | 'chest'
  | 'exit'
  | 'hero'
  | 'items'
  | 'portraits'
  | 'shadow'
  | 'font'
  | 'backdrop'
  | 'tileset'
  | 'arrows'
  | BgKey
  | NpcKey;

export type LevelsRegistry = Record<string, LevelMap>;
export type ItemsRegistry = Readonly<Record<string, ItemData>>;
export type DecorationFramesMapRegistry = Readonly<Record<string, DecorationFrames>>;
export type TilesFrameMapRegistry = Readonly<Record<string, number>>;

export interface AnimationRegistry {
  hero: Partial<Record<AnimationFrame, AnimationConfig>>;
  npc: Partial<Record<AnimationFrame, AnimationConfig>>;
  tiles: Record<string, AnimationConfig>;
}

export const ANIMATION_OBJECT_TYPES = ['npc', 'hero', 'tiles'] satisfies readonly (keyof AnimationRegistry)[];
export type AnimationObjectType = (typeof ANIMATION_OBJECT_TYPES)[number];
