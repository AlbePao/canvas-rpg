import { CHANGE_LEVEL, HERO_EXITS } from '../../constants/events';
import { gridCells } from '../../helpers/grid';
import { objectKeys } from '../../helpers/objectKeys';
import type { ExitData } from '../../objects/Exit';
import { Exit } from '../../objects/Exit';
import { Hero } from '../../objects/Hero';
import { CollectibleItem } from '../../objects/Item';
import { Level } from '../../objects/Level';
import { Events } from '../Events';
import type { GameObject } from '../GameObject';
import { LevelTransition } from '../LevelTransition';
import { Resources } from '../Resources';
import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';
import type { LevelBuilderConfig, LevelExit, LevelMap, LevelsId } from './levelBuilder.types';
import { GRASS1_LEVEL } from './levels/grass1Level';
import { PURPLE_LEVEL } from './levels/purpleLevel';
import { TEST_TILES_LEVEL } from './levels/testTilesLevel';
import { WORLD_TILES_FRAME_MAP } from './tilesFramesMap';

const LEVELS: Record<LevelsId, LevelMap> = {
  grass1Level: GRASS1_LEVEL,
  purpleLevel: PURPLE_LEVEL,
  testTilesLevel: TEST_TILES_LEVEL,
};

export class LevelBuilder extends Level {
  exits: Record<string, LevelExit> = {};

  constructor(config: LevelBuilderConfig) {
    // TODO: uncomment when levels are defined fom a json
    // const levelMap = LevelsMapper.getLevel(config.id);
    // if (!levelMap) {
    //   throw new Error(`Level "${config.id}" not found in LevelsMapper`);
    // }

    const { id, background, heroDefaultPosition, tiles, walls, exits, gameObjects } = LEVELS[config.id];

    super({ id });

    this.background = new Sprite({
      id: `${id}-background-sprite`,
      resource: Resources.images[background.resource],
      frameSize: new Vector2(background.frameSize.x, background.frameSize.y),
    });

    // Add tiles
    objectKeys(tiles).forEach((coords) => {
      const [x, y] = coords.split(',').map(Number);
      const tileKey = tiles[coords];

      if (!tileKey) {
        return;
      }

      const frame = WORLD_TILES_FRAME_MAP[tileKey];
      const worldTileSprite = new Sprite({
        id: `${id}-world-tile-${coords}`,
        resource: Resources.images.worldTiles,
        frameSize: new Vector2(16, 16),
        hFrames: 16,
        vFrames: 9,
        frame,
        position: new Vector2(gridCells(x), gridCells(y)),
      });

      worldTileSprite.drawLayer = 'FLOOR';
      this.addChild(worldTileSprite);
    });

    // Add hero
    this.heroStartPosition =
      config?.heroStartPosition ?? new Vector2(gridCells(heroDefaultPosition.x), gridCells(heroDefaultPosition.y));
    const hero = new Hero({
      id: `${id}-hero`,
      x: this.heroStartPosition.x,
      y: this.heroStartPosition.y,
    });
    this.addChild(hero);

    // Add walls
    walls.forEach((wallCoords) => {
      const [x, y] = wallCoords.split(',').map(Number);
      this.walls.add(`${gridCells(x)},${gridCells(y)}`);
    });

    // Add level exits
    exits.forEach((exitData) => {
      const { id: exitId, x, y } = exitData;
      const exit = new Exit({
        id: exitId,
        x: gridCells(x),
        y: gridCells(y),
      });

      this.addChild(exit);
      this.exits[exitId] = exitData;
    });

    // Add game objects
    gameObjects.forEach((gameObject) => {
      const { id: gameObjectId, type, x, y } = gameObject;
      let object: GameObject | null = null;

      if (type === 'CollectibleItem') {
        object = new CollectibleItem({
          id: gameObjectId,
          item: gameObject.item,
          x: gridCells(x),
          y: gridCells(y),
        });
      }

      if (type === 'Decoration') {
        const { id: decorationId, x, y, key, isSolid, drawLayer } = gameObject;
        const frame = WORLD_TILES_FRAME_MAP[key];

        object = new Sprite({
          id: decorationId,
          resource: Resources.images.worldTiles,
          frameSize: new Vector2(16, 16),
          hFrames: 16,
          vFrames: 9,
          frame,
          position: new Vector2(gridCells(x), gridCells(y)),
        });

        object.isSolid = !!isSolid;

        // Mark decorations to render on top or bottom of characters
        object.drawLayer = drawLayer ?? null;
      }

      if (object) {
        this.addChild(object);
      }
    });
  }

  override ready(): void {
    Events.on<ExitData>(HERO_EXITS, this, ({ id }) => {
      const { newLevelId, heroNewPosition } = this.exits[id];

      // TODO: uncomment when levels are defined fom a json
      // if (!LevelsMapper.hasLevel(newLevelId)) {
      //   throw new Error(`Level "${newLevelId}" not found in LevelsMapper`);
      // }

      LevelTransition.init(() => {
        Events.emit(
          CHANGE_LEVEL,
          new LevelBuilder({
            id: newLevelId,
            heroStartPosition: new Vector2(gridCells(heroNewPosition.x), gridCells(heroNewPosition.y)),
          }),
        );
      });
    });
  }
}
