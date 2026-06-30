export interface Resource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

export type AssetsToLoad = Readonly<Record<ResourceKey, string>>;

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
  | 'textBox'
  | 'tileset'
  | 'arrows'
  | BgKey
  | NpcKey;
