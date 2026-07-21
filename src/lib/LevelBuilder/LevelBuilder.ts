import { Chest } from '../../objects/Chest';
import { Decoration } from '../../objects/Decoration';
import type { ExitData } from '../../objects/Exit';
import { Exit } from '../../objects/Exit';
import { Hero, HERO_COLLECTS_ITEM, HERO_EXITS, HERO_OPENS_CHEST } from '../../objects/Hero';
import { CollectibleItem, type CollectibleItemData } from '../../objects/Item';
import { CHANGE_LEVEL, Level } from '../../objects/Level';
import { LevelTile } from '../../objects/LevelTile';
import { Npc } from '../../objects/Npc';
import { Sprite } from '../../objects/Sprite';
import { Events } from '../Events';
import { Game, objectKeys, toGridSize } from '../Game';
import type { GameObject } from '../GameObject';
import { GameRegistry } from '../GameRegistry';
import { Inventory } from '../Inventory';
import { LevelStateManager } from '../LevelStateManager';
import { ScreenTransition } from '../ScreenTransition';
import { Vector2 } from '../Vector2';
import type { LevelBuilderConfig } from './levelBuilder.types';

export class LevelBuilder extends Level {
  constructor(config: LevelBuilderConfig) {
    const level = GameRegistry.getLevel(config.id);

    if (!level) {
      throw new Error(`LevelBuilder: level "${config.id}" not found in GameRegistry`);
    }

    const { id, background, heroDefaultPosition, tiles, walls, gameObjects } = level;

    super({
      id,
    });

    if (background) {
      const { hFrames, vFrames, frameSize, position, resource } = GameRegistry.getAssetData(background.resource);
      const { containerSizes } = Game;

      this.background = new Sprite({
        id: `${id}-background-sprite`,
        resource,
        frameSize: frameSize
          ? new Vector2(frameSize.x, frameSize.y)
          : new Vector2(containerSizes.canvasWidth, containerSizes.canvasHeight),
        hFrames,
        vFrames,
        position,
      });
    }

    // Add tiles
    for (const coords of objectKeys(tiles)) {
      const [x, y] = coords.split(',').map(Number);
      const tileName = tiles[coords];

      if (!tileName) {
        return;
      }

      const worldTileSprite = new LevelTile({
        id: `${id}-world-tile-${coords}`,
        tileName,
        position: new Vector2(toGridSize(x), toGridSize(y)),
      });

      worldTileSprite.drawLayer = 'FLOOR';
      this.addChild(worldTileSprite);
    }

    // Add walls
    for (const wallCoords of walls) {
      const [x, y] = wallCoords.split(',').map(Number);
      this.walls.add(`${toGridSize(x)},${toGridSize(y)}`);
    }

    const seenIds = new Set<string>();
    const hasDuplicatedIds = gameObjects.some(({ id: gameObjectId }) => {
      if (seenIds.has(gameObjectId)) {
        return true;
      }
      seenIds.add(gameObjectId);
      return false;
    });

    if (hasDuplicatedIds) {
      throw new Error('LevelBuilder: two or more game objects have the same id');
    }

    // Add game objects
    for (const gameObject of gameObjects) {
      const { type, id } = gameObject;
      const objectState = LevelStateManager.getObjectState(this.id, id);

      if (objectState?.removed) {
        continue; // Skip this object if it has been removed
      }

      let object: GameObject | null = null;

      if (type === 'CollectibleItem') {
        object = new CollectibleItem(gameObject);
      }

      if (type === 'Chest') {
        object = new Chest({ ...gameObject, status: objectState?.status });
      }

      if (type === 'Npc') {
        object = new Npc(gameObject);
      }

      if (type === 'Decoration') {
        object = new Decoration(gameObject);
      }

      if (type === 'Exit') {
        object = new Exit(gameObject);
      }

      if (object) {
        this.addChild(object);
      }
    }

    // Add hero
    this.heroStartPosition = config?.heroStartPosition ?? { x: heroDefaultPosition.x, y: heroDefaultPosition.y };
    const hero = new Hero({
      id: `${id}-hero`,
      x: this.heroStartPosition.x,
      y: this.heroStartPosition.y,
    });
    this.addChild(hero);
  }

  override ready(): void {
    Events.on<CollectibleItemData>(HERO_COLLECTS_ITEM, this, ({ id, itemKey }) => {
      // Add collected item to inventory list
      Inventory.add(itemKey);
      // Update level item status
      LevelStateManager.setObjectState(this.id, id, { removed: true });
    });

    Events.on<Chest>(HERO_OPENS_CHEST, this, ({ id, removeAfterLoot, status }) => {
      // Update level chest status
      LevelStateManager.setObjectState(this.id, id, {
        removed: removeAfterLoot,
        status,
      });
    });

    Events.on<ExitData>(HERO_EXITS, this, ({ newLevelId, newHeroPosition }) => {
      if (!GameRegistry.hasLevel(newLevelId)) {
        throw new Error(`LevelBuilder: level "${newLevelId}" not found in GameRegistry`);
      }

      new ScreenTransition(() => {
        Events.emit<LevelBuilder>(
          CHANGE_LEVEL,
          new LevelBuilder({
            id: newLevelId,
            heroStartPosition: newHeroPosition,
          }),
        );
      });
    });
  }
}
