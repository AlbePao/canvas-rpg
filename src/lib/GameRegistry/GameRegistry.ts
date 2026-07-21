import type { DecorationFrames } from '../../objects/Decoration';
import type { AnimationConfig } from '../FrameIndexPattern';
import { Singleton } from '../Singleton';
import type {
  AnimationObjectType,
  AnimationRegistry,
  DecorationFramesMapRegistry,
  ItemData,
  ItemsRegistry,
  TilesFrameMapRegistry,
} from './gameRegistry.types';

class GameRegistrySingleton extends Singleton<GameRegistrySingleton>() {
  private _itemsRegistry: ItemsRegistry = {};
  private _tilesFrameMapRegistry: TilesFrameMapRegistry = {};
  private _decorationsFrameMapRegistry: DecorationFramesMapRegistry = {};
  private _animationsRegistry: AnimationRegistry | null = null;

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
