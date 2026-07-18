import type { DecorationFrames } from '../../objects/Decoration';
import type { AnimationConfig } from '../FrameIndexPattern';
import { Singleton } from '../Singleton';
import { ANIMATIONS, DECORATIONS_FRAME_MAP, ITEMS_REGISTRY, LEVEL_TILES_KEYS } from './gameRegistry.constants';
import type {
  AnimationObjectKey,
  AnimationObjectType,
  AnimationRegistry,
  DecorationFramesMapRegistry,
  ItemData,
  ItemsRegistry,
  NumberRegistry,
} from './gameRegistry.types';

class GameRegistrySingleton extends Singleton<GameRegistrySingleton>() {
  private _itemsRegistry: ItemsRegistry = ITEMS_REGISTRY;
  private _npcsKeysRegistry: string[] = [];
  private _tilesFrameMapRegistry: NumberRegistry = LEVEL_TILES_KEYS;
  private _decorationsFrameMapRegistry: DecorationFramesMapRegistry = DECORATIONS_FRAME_MAP;
  private _animationsRegistry: AnimationRegistry = ANIMATIONS;

  loadItemsRegistry(data: ItemsRegistry): void {
    if (Object.keys(this._itemsRegistry).length > 0) {
      throw new Error('Items registry has already been loaded.');
    }
    this._itemsRegistry = data;
  }

  loadNpcsKeysRegistry(data: string[]): void {
    if (this._npcsKeysRegistry.length > 0) {
      throw new Error('NPCs keys registry has already been loaded.');
    }
    this._npcsKeysRegistry = data;
  }

  loadTilesFrameMapRegistry(data: NumberRegistry): void {
    if (Object.keys(this._tilesFrameMapRegistry).length > 0) {
      throw new Error('Tiles frame map registry has already been loaded.');
    }
    this._tilesFrameMapRegistry = data;
  }

  loadDecorationsFrameMapRegistry(data: DecorationFramesMapRegistry): void {
    if (Object.keys(this._decorationsFrameMapRegistry).length > 0) {
      throw new Error('Decorations frame map registry has already been loaded.');
    }
    this._decorationsFrameMapRegistry = data;
  }

  loadAnimationsRegistry(data: AnimationRegistry): void {
    if (Object.keys(this._animationsRegistry).length > 0) {
      throw new Error('Animations registry has already been loaded.');
    }
    this._animationsRegistry = data;
  }

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

  // Factory method to get animation config based on its key
  getAnimationConfig = (
    objectType: AnimationObjectType,
    key: AnimationObjectKey,
  ): Record<string, AnimationConfig> | null => {
    const animationConfig = this._animationsRegistry[objectType][key];

    return animationConfig ?? null;
  };
}

export const GameRegistry = new GameRegistrySingleton();
