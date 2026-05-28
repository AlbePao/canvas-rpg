export interface Resource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

export type NpcKey = 'ow1' | 'ow2' | 'ow3' | 'ow4' | 'ow5' | 'ow6' | 'ow7' | 'ow8' | 'ow9' | 'ow10';

export type ResourceKey =
  | 'bgCave'
  | 'bgSky'
  | 'bgVolcano'
  | 'chest'
  | 'exit'
  | 'hero'
  | 'items'
  | 'portraits'
  | 'shadow'
  | 'font'
  | 'textBox'
  | 'tileset'
  | NpcKey;
