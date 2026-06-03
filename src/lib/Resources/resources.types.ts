export interface Resource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

export type AssetsToLoad = Readonly<Record<ResourceKey, string>>;

export type NpcKey = 'ow1' | 'ow2' | 'ow3' | 'ow4' | 'ow5' | 'ow6' | 'ow7' | 'ow8' | 'ow9' | 'ow10';

export type BgKey = 'bgCave' | 'bgSky' | 'bgVolcano';

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
  | BgKey
  | NpcKey;
