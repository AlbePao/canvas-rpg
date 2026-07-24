import type { DecorationFrames } from '../../objects/Decoration';
import type { LevelMap } from '../../objects/LevelBuilder';
import type { ReadonlyRecord } from '../../types/readonlyRecord';
import type { AnimationConfig } from '../FrameIndexPattern';
import { Registry } from '../Registry/Registry';
import { Singleton } from '../Singleton';
import type {
  AnimationObjectType,
  AnimationRegistry,
  AssetLoaded,
  CharFrameData,
  ItemData,
} from './gameRegistry.types';

class GameRegistrySingleton extends Singleton<GameRegistrySingleton>() {
  private _levelsIdsRegistry = new Set<string>();
  readonly levels = new Registry<LevelMap>('Levels', true);
  readonly assets = new Registry<AssetLoaded>('Assets');
  readonly arrowDirections = new Registry<number>('ArrowDirections');
  readonly chars = new Registry<CharFrameData>('Chars');
  readonly items = new Registry<ItemData>('Items');
  readonly tiles = new Registry<number>('Tiles');
  readonly chestStatuses = new Registry<number>('ChestStatuses');
  readonly decorations = new Registry<DecorationFrames>('Decorations');
  private _animationsRegistry: AnimationRegistry | null = null;

  loadLevelsIdsRegistry(levelIds: string[]): void {
    if (this._levelsIdsRegistry.size > 0) {
      throw new Error('Levels IDs registry has already been loaded.');
    }
    this._levelsIdsRegistry = new Set(levelIds);
  }

  loadAnimationsRegistry(data: AnimationRegistry): void {
    if (this._animationsRegistry !== null) {
      throw new Error('Animations registry has already been loaded.');
    }
    this._animationsRegistry = data;
  }

  getFirstLevelId(): string {
    if (this._levelsIdsRegistry.size === 0) {
      throw new Error('No levels have been loaded into the registry.');
    }

    return Array.from(this._levelsIdsRegistry)[0];
  }

  getLevelIds(): string[] {
    return [...this._levelsIdsRegistry];
  }

  // Factory method to get animation configuration for a specific object type. If a key is provided, it returns the configuration for that specific animation; otherwise, it returns all animations for the object type.
  getAnimationConfig(objectType: AnimationObjectType, key?: string): ReadonlyRecord<string, AnimationConfig> | null {
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

    return this._animationsRegistry[objectType] ?? null;
  }
}

export const GameRegistry = new GameRegistrySingleton();
