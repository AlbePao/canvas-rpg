import { CHANGE_LEVEL, HERO_EXITS } from '../constants/events';
import { Events } from '../Events';
import { GameObject, GameObjectDrawLayer } from '../GameObject';
import { gridCells } from '../helpers/grid';
import { objectKeys } from '../helpers/objectKeys';
import { CaveLevel1 } from '../levels/CaveLevel1';
import { Exit } from '../objects/Exit';
import { Hero } from '../objects/Hero';
import { CollectibleItem, ItemKey } from '../objects/Item';
import { Level, LevelConfig } from '../objects/Level';
import { Resources } from '../Resources';
import { Sprite } from '../Sprite';
import { Coords } from '../types/coords';
import { Vector2 } from '../Vector2';

type WorldTile =
  | 'grassUpperLeft'
  | 'grassUpper'
  | 'grassUpperRight'
  | 'grass'
  | 'grassObstacle'
  | 'grassLeft'
  | 'grassRight'
  | 'grassLowerLeft'
  | 'grassLower'
  | 'grassLowerRight'
  | 'grassPattern'
  | 'grassWater'
  | 'treeUpper'
  | 'treeLower'
  | 'bush'
  | 'stones'
  | 'rock'
  | 'house';
interface Coords2D {
  x: number;
  y: number;
}

type WorldTilesFrameMap = Record<WorldTile, number>;
type GameObjectsBaseConfig = { id: string } & Coords2D;

type ExitConfig = {
  type: 'Exit';
} & GameObjectsBaseConfig;

type CollectibleItemConfig = {
  type: 'CollectibleItem';
  item: ItemKey;
} & GameObjectsBaseConfig;

type DecorationConfig = {
  type: 'Decoration';
  key: WorldTile;
  isSolid?: true;
  drawLayer?: GameObjectDrawLayer;
} & GameObjectsBaseConfig;

type GameObjectsConfig = ExitConfig | CollectibleItemConfig | DecorationConfig;

interface LevelMap {
  id: string;
  background: {
    resource: 'bgCave' | 'bgSky' | 'bgVolcano';
    frameSize: Coords2D;
  };
  horizontalTiles: number;
  verticalTiles: number;
  heroDefaultPosition: Coords2D;
  gameObjects: GameObjectsConfig[];
  walls: Coords[];
  tiles: Record<Coords, WorldTile | null>;
}

const WORLD_TILES_FRAME_MAP: WorldTilesFrameMap = {
  grassUpperLeft: 0,
  grassUpper: 1,
  grassUpperRight: 2,
  grassLeft: 16,
  grass: 17,
  grassRight: 18,
  grassLowerLeft: 32,
  grassLower: 33,
  grassLowerRight: 34,
  grassPattern: 3,
  grassWater: 19,
  grassObstacle: 35,
  treeUpper: 96,
  treeLower: 112,
  bush: 113,
  stones: 98,
  rock: 114,
  house: 115,
};

const TEST_LEVEL_MAP: LevelMap = {
  id: 'outdoorLevel1',
  background: {
    resource: 'bgSky',
    frameSize: {
      x: 320,
      y: 180,
    },
  },
  horizontalTiles: 13,
  verticalTiles: 6,
  heroDefaultPosition: {
    x: 3,
    y: 2,
  },
  gameObjects: [
    {
      type: 'Exit',
      id: 'exit',
      x: 3,
      y: 1,
    },
    {
      type: 'CollectibleItem',
      id: 'hammer',
      item: 'hammer1',
      x: 5,
      y: 4,
    },
    {
      type: 'Decoration',
      id: 'tree-upper-decoration',
      key: 'treeUpper',
      x: 11,
      y: 1,
      drawLayer: 'WORLD_TOP',
    },
    {
      type: 'Decoration',
      id: 'tree-lower-decoration',
      key: 'treeLower',
      x: 11,
      y: 2,
      isSolid: true,
    },
    {
      type: 'Decoration',
      id: 'house-decoration',
      key: 'house',
      x: 12,
      y: 2,
      isSolid: true,
    },
    {
      type: 'Decoration',
      id: 'rock1-decoration',
      key: 'rock',
      x: 10,
      y: 4,
      isSolid: true,
    },
    {
      type: 'Decoration',
      id: 'rock2-decoration',
      key: 'rock',
      x: 11,
      y: 4,
      isSolid: true,
    },
    {
      type: 'Decoration',
      id: 'rock3-decoration',
      key: 'rock',
      x: 12,
      y: 4,
      isSolid: true,
    },
  ],
  walls: [
    '0,0',
    '1,0',
    '2,0',
    '3,0',
    '4,-1',
    '5,-1',
    '6,-1',
    '7,-1',
    '8,-1',
    '9,-1',
    '10,-1',
    '11,-1',
    '12,-1',
    '13,0',
    '5,1',
    '6,1',
    '1,2',
    '2,2',
    '1,3',
    '2,3',
    '4,3',
    '5,3',
    '6,3',
    '7,3',
    '0,5',
    '1,5',
    '2,5',
    '3,5',
    '4,5',
    '5,5',
    '6,5',
    '7,5',
    '8,5',
    '9,5',
    '10,5',
    '11,5',
    '12,5',
    '13,5',
  ],
  tiles: {
    // First row
    '0,0': null,
    '1,0': null,
    '2,0': null,
    '3,0': null,
    '4,0': 'grassUpperLeft',
    '5,0': 'grassUpper',
    '6,0': 'grassUpper',
    '7,0': 'grassUpper',
    '8,0': 'grassUpper',
    '9,0': 'grassUpper',
    '10,0': 'grassUpper',
    '11,0': 'grassUpper',
    '12,0': 'grassUpperRight',
    '13,0': null,
    // Second row
    '0,1': 'grassUpperLeft',
    '1,1': 'grassUpper',
    '2,1': 'grassUpper',
    '3,1': 'grassUpper',
    '4,1': 'grass',
    '5,1': 'grassObstacle',
    '6,1': 'grassObstacle',
    '7,1': 'grass',
    '8,1': 'grass',
    '9,1': 'grass',
    '10,1': 'grass',
    '11,1': 'grass',
    '12,1': 'grass',
    '13,1': 'grassUpperRight',
    // Third row
    '0,2': 'grassLeft',
    '1,2': 'grassObstacle',
    '2,2': 'grassObstacle',
    '3,2': 'grass',
    '4,2': 'grass',
    '5,2': 'grass',
    '6,2': 'grass',
    '7,2': 'grass',
    '8,2': 'grass',
    '9,2': 'grass',
    '10,2': 'grass',
    '11,2': 'grass',
    '12,2': 'grass',
    '13,2': 'grassRight',
    // Fourth row
    '0,3': 'grassLeft',
    '1,3': 'grassObstacle',
    '2,3': 'grassObstacle',
    '3,3': 'grass',
    '4,3': 'grassWater',
    '5,3': 'grassWater',
    '6,3': 'grassWater',
    '7,3': 'grassWater',
    '8,3': 'grass',
    '9,3': 'grass',
    '10,3': 'grass',
    '11,3': 'grass',
    '12,3': 'grass',
    '13,3': 'grassRight',
    // Fifth row
    '0,4': 'grassLeft',
    '1,4': 'grass',
    '2,4': 'grass',
    '3,4': 'grass',
    '4,4': 'grass',
    '5,4': 'grass',
    '6,4': 'grass',
    '7,4': 'grass',
    '8,4': 'grass',
    '9,4': 'grass',
    '10,4': 'grass',
    '11,4': 'grass',
    '12,4': 'grass',
    '13,4': 'grassRight',
    // Sixth row
    '0,5': 'grassLowerLeft',
    '1,5': 'grassLower',
    '2,5': 'grassLower',
    '3,5': 'grassLower',
    '4,5': 'grassLower',
    '5,5': 'grassLower',
    '6,5': 'grassLower',
    '7,5': 'grassLower',
    '8,5': 'grassLower',
    '9,5': 'grassLower',
    '10,5': 'grassLower',
    '11,5': 'grassLower',
    '12,5': 'grassLower',
    '13,5': 'grassLowerRight',
  },
};

// TODO: add zod validation of LevelMap object
export class LevelBuilder extends Level {
  constructor(config?: LevelConfig) {
    const { id, background, heroDefaultPosition } = TEST_LEVEL_MAP;

    super({ id });

    this.background = new Sprite({
      id: `${TEST_LEVEL_MAP.id}-background-sprite`,
      resource: Resources.images[background.resource],
      frameSize: new Vector2(background.frameSize.x, background.frameSize.y),
    });

    // Add tiles
    objectKeys(TEST_LEVEL_MAP.tiles).forEach((coords) => {
      const [x, y] = coords.split(',').map(Number);
      const tileKey = TEST_LEVEL_MAP.tiles[coords];

      if (!tileKey) {
        return;
      }

      const frame = WORLD_TILES_FRAME_MAP[tileKey];
      const worldTileSprite = new Sprite({
        id: `${TEST_LEVEL_MAP.id}-world-tile-${coords}`,
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
      id: `${TEST_LEVEL_MAP.id}-hero`,
      x: this.heroStartPosition.x,
      y: this.heroStartPosition.y,
    });
    this.addChild(hero);

    // Add walls
    TEST_LEVEL_MAP.walls.forEach((wallCoords) => {
      const [x, y] = wallCoords.split(',').map(Number);
      this.walls.add(`${gridCells(x)},${gridCells(y)}`);
    });
  }

  override ready(): void {
    // Add game objects
    TEST_LEVEL_MAP.gameObjects.forEach((gameObject) => {
      const { id, type, x, y } = gameObject;
      let object: GameObject | null = null;

      if (type === 'Exit') {
        object = new Exit({
          id: `${TEST_LEVEL_MAP.id}-exit`,
          x: gridCells(x),
          y: gridCells(y),
        });
      }

      if (type === 'CollectibleItem') {
        object = new CollectibleItem({
          id: `${TEST_LEVEL_MAP.id}-${id}`,
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
      Events.emit(
        CHANGE_LEVEL,
        new CaveLevel1({
          heroPosition: new Vector2(gridCells(3), gridCells(6)),
        }),
      );
    });
  }
}
