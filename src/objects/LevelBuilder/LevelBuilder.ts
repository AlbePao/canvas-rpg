import { Events } from '../../lib/Events';
import { checkDuplicateIds, Game, objectKeys, toGridSize } from '../../lib/Game';
import { GameRegistry } from '../../lib/GameRegistry';
import { Inventory } from '../../lib/Inventory';
import { LevelStateManager } from '../../lib/LevelStateManager';
import { ScreenTransition } from '../../lib/ScreenTransition';
import { Vector2 } from '../../lib/Vector2';
import { Chest } from '../Chest';
import { Decoration } from '../Decoration';
import type { ExitData } from '../Exit';
import { Exit } from '../Exit';
import { Hero, HERO_COLLECTS_ITEM, HERO_EXITS, HERO_OPENS_CHEST } from '../Hero';
import { CollectibleItem, type CollectibleItemData } from '../Item';
import { CHANGE_LEVEL, Level } from '../Level';
import { LevelTile } from '../LevelTile';
import { Npc } from '../Npc';
import { Sprite } from '../Sprite';
import type { LevelBuilderConfig } from './levelBuilder.types';

export class LevelBuilder extends Level {
  constructor(config: LevelBuilderConfig) {
    const { levels, assets } = GameRegistry;
    const level = levels.get(config.id);

    if (!level) {
      throw new Error(`LevelBuilder: level "${config.id}" not found in GameRegistry`);
    }

    const { id, background, heroDefaultPosition, tiles, walls, gameObjects } = level;

    super({
      id,
    });

    if (background) {
      const { hFrames, vFrames, frameSize, position, resource } = assets.get(background.resource);
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

      worldTileSprite.drawLayer = 'floor';
      this.addChild(worldTileSprite);
    }

    // Add walls
    for (const wallCoords of walls) {
      const [x, y] = wallCoords.split(',').map(Number);
      this.walls.add(`${toGridSize(x)},${toGridSize(y)}`);
    }

    const hasDuplicatedIds = checkDuplicateIds(gameObjects);

    if (hasDuplicatedIds) {
      throw new Error('LevelBuilder: two or more objects have the same id');
    }

    // Add game objects
    for (const gameObject of gameObjects) {
      const { type, id } = gameObject;
      const objectState = LevelStateManager.getObjectState(this.id, id);

      if (objectState?.removed) {
        continue; // Skip this object if it has been removed
      }

      if (type === 'CollectibleItem') {
        this.addChild(new CollectibleItem(gameObject));
      } else if (type === 'Chest') {
        this.addChild(new Chest({ ...gameObject, status: objectState?.status }));
      } else if (type === 'Npc') {
        this.addChild(new Npc(gameObject));
      } else if (type === 'Decoration') {
        this.addChild(new Decoration(gameObject));
      } else if (type === 'Exit') {
        this.addChild(new Exit(gameObject));
      } else {
        const exhaustiveCheck: never = type;
        throw new Error(`LevelBuilder: unhandled game object type "${String(exhaustiveCheck)}"`);
      }
    }

    // Add hero
    const { heroStartPosition = heroDefaultPosition, heroFacingDirection } = config;
    this.heroStartPosition = heroStartPosition;
    const hero = new Hero({
      id: `${id}-hero`,
      x: this.heroStartPosition.x,
      y: this.heroStartPosition.y,
      facingDirection: heroFacingDirection,
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
