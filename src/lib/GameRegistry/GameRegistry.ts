import type { DecorationFrames } from '../../objects/Decoration';
import type { AnimationConfig } from '../FrameIndexPattern';
import { objectKeys } from '../Game';
import type { LevelMap } from '../LevelBuilder';
import { Singleton } from '../Singleton';
import { Vector2 } from '../Vector2';
import type {
  AnimationObjectType,
  AnimationRegistry,
  AssetLoaded,
  AssetsRegistry,
  AssetsToLoad,
  DecorationFramesMapRegistry,
  ItemData,
  ItemsRegistry,
  LevelsRegistry,
  TilesFrameMapRegistry,
} from './gameRegistry.types';

export const ASSETS: AssetsToLoad = {
  bgBeach: {
    src: '/sprites/backgrounds/beach.png',
  },
  bgSnow: {
    src: '/sprites/backgrounds/snow.png',
  },
  bgWoods: {
    src: '/sprites/backgrounds/woods.png',
  },
  ow1: {
    src: '/sprites/npcs/ow1.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow2: {
    src: '/sprites/npcs/ow2.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow3: {
    src: '/sprites/npcs/ow3.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow4: {
    src: '/sprites/npcs/ow4.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow5: {
    src: '/sprites/npcs/ow5.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow6: {
    src: '/sprites/npcs/ow6.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow7: {
    src: '/sprites/npcs/ow7.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow8: {
    src: '/sprites/npcs/ow8.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow9: {
    src: '/sprites/npcs/ow9.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  ow10: {
    src: '/sprites/npcs/ow10.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 4,
    vFrames: 4,
    position: { x: -8, y: -20 },
  },
  chest: {
    src: '/sprites/chest-sheet.png',
    frameSize: { x: 16, y: 16 },
    hFrames: 2,
    vFrames: 1,
  },
  exit: {
    src: '/sprites/exit.png',
    frameSize: { x: 16, y: 16 },
  },
  hero: {
    src: '/sprites/hero-sheet.png',
    frameSize: { x: 32, y: 32 },
    hFrames: 3,
    vFrames: 8,
    position: { x: -8, y: -20 },
  },
  items: {
    src: '/sprites/items-sheet.png',
    frameSize: { x: 16, y: 32 },
    hFrames: 10,
    vFrames: 1,
  },
  portraits: {
    src: '/sprites/portraits-sheet.png',
    hFrames: 4,
  },
  shadow: {
    src: '/sprites/shadow.png',
    frameSize: { x: 32, y: 32 },
    position: { x: -8, y: -19 },
  },
  font: {
    src: '/sprites/sprite-font.png',
    hFrames: 13,
    vFrames: 6,
  },
  backdrop: {
    src: '/sprites/backdrop-sheet.png',
    hFrames: 3,
    vFrames: 3,
  },
  tileset: {
    src: '/sprites/tileset.png',
    hFrames: 52,
    vFrames: 25,
  },
  arrows: {
    src: '/sprites/arrows-sheet.png',
    frameSize: { x: 11, y: 11 },
    hFrames: 4,
    vFrames: 1,
  },
};

class GameRegistrySingleton extends Singleton<GameRegistrySingleton>() {
  private _levelsRegistry: LevelsRegistry = {};
  private _assetsRegistry: AssetsRegistry = {};
  private _itemsRegistry: ItemsRegistry = {};
  private _tilesFrameMapRegistry: TilesFrameMapRegistry = {};
  private _decorationsFrameMapRegistry: DecorationFramesMapRegistry = {};
  private _animationsRegistry: AnimationRegistry | null = null;

  loadLevel = (levelId: string, levelData: LevelMap): void => {
    if (this._levelsRegistry[levelId]) {
      throw new Error(`Level with ID "${levelId}" has already been loaded.`);
    }
    this._levelsRegistry[levelId] = levelData;
  };

  loadAssetsRegistry = (data: AssetsToLoad): void => {
    if (Object.keys(this._assetsRegistry).length > 0) {
      throw new Error('Assets registry has already been loaded.');
    }

    for (const key of objectKeys(data)) {
      const assetData = data[key];
      const { src, frameSize, position, ...otherData } = assetData;
      const img = new Image();
      img.src = src;
      this._assetsRegistry[key] = {
        ...otherData,
        resource: {
          image: img,
          isLoaded: false,
        },
      };

      if (frameSize) {
        this._assetsRegistry[key].frameSize = new Vector2(frameSize.x, frameSize.y);
      }

      if (position) {
        this._assetsRegistry[key].position = new Vector2(position.x, position.y);
      }

      img.onload = (): void => {
        this._assetsRegistry[key].resource.isLoaded = true;
      };
    }
  };

  loadItemsRegistry = (data: ItemsRegistry): void => {
    if (Object.keys(this._itemsRegistry).length > 0) {
      throw new Error('Items registry has already been loaded.');
    }
    this._itemsRegistry = data;
  };

  loadTilesFrameMapRegistry = (data: TilesFrameMapRegistry): void => {
    if (Object.keys(this._tilesFrameMapRegistry).length > 0) {
      throw new Error('Tiles frame map registry has already been loaded.');
    }
    this._tilesFrameMapRegistry = data;
  };

  loadDecorationsFrameMapRegistry = (data: DecorationFramesMapRegistry): void => {
    if (Object.keys(this._decorationsFrameMapRegistry).length > 0) {
      throw new Error('Decorations frame map registry has already been loaded.');
    }
    this._decorationsFrameMapRegistry = data;
  };

  loadAnimationsRegistry = (data: AnimationRegistry): void => {
    if (this._animationsRegistry !== null) {
      throw new Error('Animations registry has already been loaded.');
    }
    this._animationsRegistry = data;
  };

  /**
   * Get a specific level by ID
   * Returns null if the level doesn't exist
   */
  getLevel(id: string): LevelMap | null {
    const level = this._levelsRegistry[id];
    if (!level) {
      console.warn(`Level "${id}" not found in LevelsMapper`);
      return null;
    }

    return level;
  }

  /**
   * Check if a level exists
   */
  hasLevel(id: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._levelsRegistry, id);
  }

  // Factory method to get asset data based on its key
  getAssetData = (key: string): AssetLoaded => {
    const asset = this._assetsRegistry[key];

    if (!asset) {
      throw new Error(`Asset with key "${key}" does not exist.`);
    }

    return asset;
  };

  // Factory method to get an item data based on its key
  getItem = (itemKey: string): ItemData => {
    const item = this._itemsRegistry[itemKey];

    if (!item) {
      throw new Error(`Item with key "${itemKey}" does not exist.`);
    }

    return item;
  };

  // Factory method to get frame number for a tile based on its key
  getTileFrame = (tileKey: string): number => {
    const frame = this._tilesFrameMapRegistry[tileKey];

    if (!frame && frame !== 0) {
      throw new Error(`Tile with key "${tileKey}" does not exist.`);
    }

    return frame;
  };

  // Factory method to get frame number for a decoration based on its key
  getDecorationFrame = (decorationKey: string): DecorationFrames => {
    const frame = this._decorationsFrameMapRegistry[decorationKey];

    if (!frame) {
      throw new Error(`Decoration with key "${decorationKey}" does not exist.`);
    }

    return frame;
  };

  // Factory method to get animation configuration for a specific object type. If a key is provided, it returns the configuration for that specific animation; otherwise, it returns all animations for the object type.
  getAnimationConfig = (objectType: AnimationObjectType, key?: string): Record<string, AnimationConfig> | null => {
    if (!this._animationsRegistry) {
      return null;
    }

    if (objectType === 'tiles') {
      const tilesAnimations = this._animationsRegistry.tiles;

      if (objectType === 'tiles' && key) {
        const animationConfig = tilesAnimations?.[key];
        return animationConfig ? { [key]: animationConfig } : null;
      }

      return tilesAnimations ?? null;
    }

    const charAnimations = this._animationsRegistry?.[objectType];

    return charAnimations ?? null;
  };
}

export const GameRegistry = new GameRegistrySingleton();
