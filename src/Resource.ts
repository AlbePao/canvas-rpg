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
  | 'textBox'
  | 'fontWhite'
  | 'portraits';

class Resources extends Singleton<Resources>() {
  // Every image we want to download
  private _toLoad: Record<ImageKeys, string> = {
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
    // HUD
    textBox: '/sprites/text-box.png',
    fontWhite: '/sprites/sprite-font-white.png',
    portraits: '/sprites/portraits-sheet.png',
  } as const;

  // A bucket to keep all of our images
  images: Record<ImageKeys, Resource> = {} as Record<ImageKeys, Resource>;

  constructor() {
    super();
    Object.keys(this._toLoad).forEach((key) => {
      const imageKey = key as ImageKeys;
      const img = new Image();
      img.src = this._toLoad[imageKey];
      this.images[imageKey] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[imageKey].isLoaded = true;
      };
    });
  }
}

export const resources = Resources.getInstance();
