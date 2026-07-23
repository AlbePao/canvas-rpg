import type { DecorationFrames } from '../../objects/Decoration';
import type { LevelMap } from '../../objects/LevelBuilder';
import type { ReadonlyRegistry } from '../../types/readonlyRegistry';
import type { AnimationConfig } from '../FrameIndexPattern';
import { objectKeys } from '../Game';
import { Singleton } from '../Singleton';
import { Vector2 } from '../Vector2';
import type {
  AnimationObjectType,
  AnimationRegistry,
  AssetLoaded,
  AssetsRegistry,
  AssetsToLoad,
  CharFrameData,
  CharsFrameMapRegistry,
  DecorationFramesMapRegistry,
  ItemData,
  ItemsRegistry,
  LevelsRegistry,
} from './gameRegistry.types';

// TODO: reduce class size by abstracting repetitive code into helper functions or separate classes. The GameRegistry class is currently quite large and could benefit from refactoring to improve maintainability and readability.
class GameRegistrySingleton extends Singleton<GameRegistrySingleton>() {
  private _levelsIdsRegistry = new Set<string>();
  private _levelsRegistry: LevelsRegistry = {};
  private _assetsRegistry: AssetsRegistry = {};
  private _arrowDirectionFrameMapRegistry: ReadonlyRegistry = {};
  private _charsFrameMapRegistry: CharsFrameMapRegistry = {};
  private _chestStatusFrameMapRegistry: ReadonlyRegistry = {};
  private _itemsRegistry: ItemsRegistry = {};
  private _tilesFrameMapRegistry: ReadonlyRegistry = {};
  private _decorationsFrameMapRegistry: DecorationFramesMapRegistry = {};
  private _animationsRegistry: AnimationRegistry | null = null;

  loadLevelsIdsRegistry = (levelIds: string[]): void => {
    if (this._levelsIdsRegistry.size > 0) {
      throw new Error('Levels IDs registry has already been loaded.');
    }
    this._levelsIdsRegistry = new Set(levelIds);
  };

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

  loadArrowDirectionFrameMapRegistry = (data: ReadonlyRegistry): void => {
    if (Object.keys(this._arrowDirectionFrameMapRegistry).length > 0) {
      throw new Error('Arrow direction frame map registry has already been loaded.');
    }
    this._arrowDirectionFrameMapRegistry = data;
  };

  loadCharsFrameMapRegistry = (data: CharsFrameMapRegistry): void => {
    if (Object.keys(this._charsFrameMapRegistry).length > 0) {
      throw new Error('Chars frame map registry has already been loaded.');
    }
    this._charsFrameMapRegistry = data;
  };

  loadItemsRegistry = (data: ItemsRegistry): void => {
    if (Object.keys(this._itemsRegistry).length > 0) {
      throw new Error('Items registry has already been loaded.');
    }
    this._itemsRegistry = data;
  };

  loadTilesFrameMapRegistry = (data: ReadonlyRegistry): void => {
    if (Object.keys(this._tilesFrameMapRegistry).length > 0) {
      throw new Error('Tiles frame map registry has already been loaded.');
    }
    this._tilesFrameMapRegistry = data;
  };

  loadChestStatusFrameMapRegistry = (data: ReadonlyRegistry): void => {
    if (Object.keys(this._chestStatusFrameMapRegistry).length > 0) {
      throw new Error('Chest status frame map registry has already been loaded.');
    }
    this._chestStatusFrameMapRegistry = data;
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

  getFirstLevelId(): string {
    if (this._levelsIdsRegistry.size === 0) {
      throw new Error('No levels have been loaded into the registry.');
    }

    return Array.from(this._levelsIdsRegistry)[0];
  }

  getLevelIds(): string[] {
    return [...this._levelsIdsRegistry];
  }

  /**
   * Get a specific level by ID
   * Returns null if the level doesn't exist
   */
  getLevel(id: string): LevelMap | null {
    if (this._levelsIdsRegistry.size === 0 || !this._levelsIdsRegistry.has(id)) {
      throw new Error(`Level "${id}" is not registered in LevelsMapper`);
    }

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
    return this._levelsIdsRegistry.has(id);
  }

  // Factory method to get asset data based on its key
  getAssetData = (key: string): AssetLoaded => {
    const asset = this._assetsRegistry[key];

    if (!asset) {
      throw new Error(`Asset with key "${key}" does not exist.`);
    }

    return asset;
  };

  // Factory method to get arrow direction frame based on its key
  getArrowDirectionFrame = (direction: string): number => {
    const frame = this._arrowDirectionFrameMapRegistry[direction];

    if (!frame && frame !== 0) {
      throw new Error(`Arrow direction "${direction}" does not exist in the arrow direction frame map registry.`);
    }

    return frame;
  };

  // Factory method to get char frame data based on its key
  getCharFrameData = (char: string): CharFrameData => {
    const charData = this._charsFrameMapRegistry[char];

    if (!charData) {
      throw new Error(`Char "${char}" does not exist in the chars frame map registry.`);
    }

    return charData;
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

  // Factory method to get frame number for a chest status based on its key
  getChestStatusFrame = (statusKey: string): number => {
    const frame = this._chestStatusFrameMapRegistry[statusKey];

    if (!frame && frame !== 0) {
      throw new Error(`Chest status with key "${statusKey}" does not exist.`);
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
  getAnimationConfig = (
    objectType: AnimationObjectType,
    key?: string,
  ): ReadonlyRegistry<string, AnimationConfig> | null => {
    if (!this._animationsRegistry) {
      return null;
    }

    if (objectType === 'tiles') {
      const tilesAnimations = this._animationsRegistry.tiles;

      if (key) {
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
