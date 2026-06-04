import { CHANGE_LEVEL, HERO_EXITS } from '../../constants/events';
import { gridCells } from '../../helpers/grid';
import { objectKeys } from '../../helpers/objectKeys';
import { TILESET_LEVEL } from '../../levels/tilesetLevel';
import { TILESET_LEVEL2 } from '../../levels/tilesetLevel2';
import { Chest } from '../../objects/Chest';
import { Decoration } from '../../objects/Decoration';
import type { ExitData } from '../../objects/Exit';
import { Exit } from '../../objects/Exit';
import { Hero } from '../../objects/Hero';
import { CollectibleItem } from '../../objects/Item';
import { Level } from '../../objects/Level';
import { LevelTile } from '../../objects/LevelTile';
import { Npc } from '../../objects/Npc';
import { Sprite } from '../../objects/Sprite';
import { Events } from '../Events';
import type { GameObject } from '../GameObject';
import { LevelTransition } from '../LevelTransition';
import { Resources } from '../Resources';
import { Vector2 } from '../Vector2';
import type { LevelBuilderConfig, LevelMap } from './levelBuilder.types';

const LEVELS: Record<string, LevelMap> = {
  tilesetLevel: TILESET_LEVEL,
  tilesetLevel2: TILESET_LEVEL2,
};

export class LevelBuilder extends Level {
  constructor(config: LevelBuilderConfig) {
    // TODO: uncomment when levels are defined from a json
    // const levelMap = LevelsMapper.getLevel(config.id);
    // if (!levelMap) {
    //   throw new Error(`LevelBuilder: level "${config.id}" not found in LevelsMapper`);
    // }

    const { id, background, heroDefaultPosition, tiles, walls, gameObjects } = LEVELS[config.id];

    super({
      id,
    });

    this.background = background
      ? new Sprite({
          id: `${id}-background-sprite`,
          resource: Resources.images[background.resource],
          frameSize: new Vector2(background.frameSize.x, background.frameSize.y),
        })
      : null;

    // Add tiles
    objectKeys(tiles).forEach((coords) => {
      const [x, y] = coords.split(',').map(Number);
      const tileName = tiles[coords];

      if (!tileName) {
        return;
      }

      const worldTileSprite = new LevelTile({
        id: `${id}-world-tile-${coords}`,
        tileName,
        position: new Vector2(gridCells(x), gridCells(y)),
      });

      worldTileSprite.drawLayer = 'FLOOR';
      this.addChild(worldTileSprite);
    });

    // Add walls
    walls.forEach((wallCoords) => {
      const [x, y] = wallCoords.split(',').map(Number);
      this.walls.add(`${gridCells(x)},${gridCells(y)}`);
    });

    // Add game objects
    gameObjects.forEach((gameObject) => {
      const { type } = gameObject;
      let object: GameObject | null = null;

      if (type === 'CollectibleItem') {
        object = new CollectibleItem(gameObject);
      }

      if (type === 'Chest') {
        object = new Chest(gameObject);
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
    });

    // Add hero
    this.heroStartPosition = config?.heroStartPosition ?? new Vector2(heroDefaultPosition.x, heroDefaultPosition.y);
    const hero = new Hero({
      id: `${id}-hero`,
      x: this.heroStartPosition.x,
      y: this.heroStartPosition.y,
    });
    this.addChild(hero);
  }

  override ready(): void {
    Events.on<ExitData>(HERO_EXITS, this, ({ newLevelId, heroNewPosition }) => {
      // TODO: uncomment when levels are defined from a json
      // if (!LevelsMapper.hasLevel(newLevelId)) {
      //   throw new Error(`LevelBuilder: level "${newLevelId}" not found in LevelsMapper`);
      // }

      new LevelTransition(() => {
        Events.emit(
          CHANGE_LEVEL,
          new LevelBuilder({
            id: newLevelId,
            heroStartPosition: new Vector2(heroNewPosition.x, heroNewPosition.y),
          }),
        );
      });
    });
  }
}
