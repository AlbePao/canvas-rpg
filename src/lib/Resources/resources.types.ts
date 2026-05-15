export interface Resource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

export type NpcKey = 'ow1' | 'ow2' | 'ow3' | 'ow4' | 'ow5' | 'ow6' | 'ow7' | 'ow8' | 'ow9' | 'ow10';

export type ResourceKey =
  | 'hero'
  | 'shadow'
  | 'rod'
  | 'items'
  | 'chest'
  | 'exit'
  | 'sky'
  | 'ground'
  | 'cave'
  | 'caveGround'
  | 'bat'
  | 'bgCave'
  | 'bgSky'
  | 'bgVolcano'
  | 'worldTiles'
  | 'textBox'
  | 'fontWhite'
  | 'portraits'
  | NpcKey;
