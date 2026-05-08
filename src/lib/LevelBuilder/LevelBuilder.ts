import { CHANGE_LEVEL, HERO_EXITS } from '../../constants/events';
import { gridCells } from '../../helpers/grid';
import { objectKeys } from '../../helpers/objectKeys';
import { CaveLevel1 } from '../../levels/CaveLevel1';
import { Hero } from '../../objects/Hero';
import { CollectibleItem } from '../../objects/Item';
import { Level } from '../../objects/Level';
import { Events } from '../Events';
import { GameObject } from '../GameObject';
import { LevelTransition } from '../LevelTransition';
import { Resources } from '../Resources';
import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';
import { LevelBuilderConfig } from './levelBuilder.types';
import { GRASS1_LEVEL } from './levels/grass1Level';
import { WORLD_TILES_FRAME_MAP } from './tilesFramesMap';

// TODO: create a LevelsMapper Record with level id and LevelMap object. Get levels dynamically from json and validate them with zod
export class LevelBuilder extends Level {
  constructor(config: LevelBuilderConfig) {
    // TODO: config.id is used to select level from LevelsMapper
    const { id, background, heroDefaultPosition, tiles, walls, exits } = GRASS1_LEVEL;

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
      config?.heroPosition ?? new Vector2(gridCells(heroDefaultPosition.x), gridCells(heroDefaultPosition.y));
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

    // TODO: add exits logic
  }

  override ready(): void {
    const { id: levelId, gameObjects } = GRASS1_LEVEL;

    // Add game objects
    gameObjects.forEach((gameObject) => {
      const { id, type, x, y } = gameObject;
      let object: GameObject | null = null;

      if (type === 'CollectibleItem') {
        object = new CollectibleItem({
          id: `${levelId}-${id}`,
          item: gameObject.item,
          x: gridCells(x),
          y: gridCells(y),
        });
      }

      if (type === 'Decoration') {
        const { id, x, y, key, isSolid, drawLayer } = gameObject;
        const frame = WORLD_TILES_FRAME_MAP[key];

        object = new Sprite({
          id,
          resource: Resources.images.worldTiles,
          frameSize: new Vector2(16, 16),
          hFrames: 16,
          vFrames: 9,
          frame,
          position: new Vector2(gridCells(x), gridCells(y)),
        });

        if (isSolid) {
          object.isSolid = isSolid;
        }

        // Mark decorations to render on top or bottom of characters
        if (drawLayer) {
          object.drawLayer = drawLayer;
        }
      }

      if (object) {
        this.addChild(object);
      }
    });

    Events.on(HERO_EXITS, this, () => {
      LevelTransition.init(() => {
        Events.emit(
          CHANGE_LEVEL,
          new CaveLevel1({
            heroPosition: new Vector2(gridCells(3), gridCells(6)),
          }),
        );
      });
    });
  }
}
