import type { DecorationFrames } from '../../objects/Decoration';
import type { LevelMap } from '../../objects/LevelBuilder';
import type { ReadonlyRegistry } from '../../types/readonlyRegistry';
import type { AnimationFrame } from '../Animations';
import type { AnimationConfig } from '../FrameIndexPattern';
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

export type AssetsToLoad = ReadonlyRegistry<string, AssetData>;
export type AssetsRegistry = Record<string, AssetLoaded>;

export type CharsFrameMapRegistry = ReadonlyRegistry<string, CharFrameData>;
export interface CharFrameData {
  frame: number;
  width: number;
}

export const BASE_RESOURCE_KEYS = [
  'chest',
  'exit',
  'hero',
  'items',
  'portraits',
  'shadow',
  'font',
  'backdrop',
  'tileset',
  'arrows',
] as const;
export type BaseResourceKey = (typeof BASE_RESOURCE_KEYS)[number];

export type LevelsRegistry = Record<string, LevelMap>;
export type ItemsRegistry = ReadonlyRegistry<string, ItemData>;
export type DecorationFramesMapRegistry = ReadonlyRegistry<string, DecorationFrames>;

export interface AnimationRegistry {
  hero: Partial<ReadonlyRegistry<AnimationFrame, AnimationConfig>>;
  npc: Partial<ReadonlyRegistry<AnimationFrame, AnimationConfig>>;
  tiles: ReadonlyRegistry<string, AnimationConfig>;
}

export const ANIMATION_OBJECT_TYPES = ['npc', 'hero', 'tiles'] satisfies readonly (keyof AnimationRegistry)[];
export type AnimationObjectType = (typeof ANIMATION_OBJECT_TYPES)[number];
