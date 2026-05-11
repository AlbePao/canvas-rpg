export interface Resource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

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
  | 'knight'
  | 'bat'
  | 'bgCave'
  | 'bgSky'
  | 'bgVolcano'
  | 'worldTiles'
  | 'textBox'
  | 'fontWhite'
  | 'portraits';
