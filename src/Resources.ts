import { objectKeys } from './helpers/objectKeys';
import { Singleton } from './lib/Singleton';

export interface Resource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

export type ImageKeys =
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

class ResourcesSingleton extends Singleton<ResourcesSingleton>() {
  // Every image we want to download
  private readonly _toLoad: Record<ImageKeys, string> = {
    hero: '/sprites/hero-sheet.png',
    shadow: '/sprites/shadow.png',
    rod: '/sprites/rod.png',
    items: '/sprites/items-sheet.png',
    chest: '/sprites/chest-sheet.png',
    exit: '/sprites/exit.png',
    // Outdoor
    sky: '/sprites/sky.png',
    ground: '/sprites/ground.png',
    // Cave
    cave: '/sprites/cave.png',
    caveGround: '/sprites/cave-ground.png',
    // NPCs
    knight: '/sprites/knight-sheet.png',
    // Enemies
    bat: '/sprites/bat-sheet.png',
    // Level builder assets
    bgCave: '/sprites/levels/bg-cave.png',
    bgSky: '/sprites/levels/bg-sky.png',
    bgVolcano: '/sprites/levels/bg-volcano.png',
    worldTiles: '/sprites/levels/world-tiles.png',
    // HUD
    textBox: '/sprites/text-box.png',
    fontWhite: '/sprites/sprite-font-white.png',
    portraits: '/sprites/portraits-sheet.png',
  };

  // A bucket to keep all of our images
  images: Record<ImageKeys, Resource> = {} as Record<ImageKeys, Resource>;

  constructor() {
    super();
    objectKeys(this._toLoad).forEach((key) => {
      const img = new Image();
      img.src = this._toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = (): void => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const Resources = ResourcesSingleton.getInstance();
