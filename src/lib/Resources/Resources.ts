import { objectKeys } from '../../helpers/objectKeys';
import { Singleton } from '../Singleton';
import type { Resource, ResourceKey } from './resources.types';

// Every image we want to download
const ASSETS_TO_LOAD: Record<ResourceKey, string> = {
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
  // knight: '/sprites/knight-sheet.png',
  ow1: '/sprites/npcs/ow1.png',
  ow2: '/sprites/npcs/ow2.png',
  ow3: '/sprites/npcs/ow3.png',
  ow4: '/sprites/npcs/ow4.png',
  ow5: '/sprites/npcs/ow5.png',
  ow6: '/sprites/npcs/ow6.png',
  ow7: '/sprites/npcs/ow7.png',
  ow8: '/sprites/npcs/ow8.png',
  ow9: '/sprites/npcs/ow9.png',
  ow10: '/sprites/npcs/ow10.png',
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
} as const;

class ResourcesSingleton extends Singleton<ResourcesSingleton>() {
  // A bucket to keep all of our images
  images: Record<ResourceKey, Resource> = {} as Record<ResourceKey, Resource>;

  constructor() {
    super();
    objectKeys(ASSETS_TO_LOAD).forEach((key) => {
      const img = new Image();
      img.src = ASSETS_TO_LOAD[key];
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
