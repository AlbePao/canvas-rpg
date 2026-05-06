import { CHANGE_LEVEL, HERO_EXITS } from '../constants/events';
import { Events } from '../Events';
import { gridCells } from '../helpers/grid';
import { objectKeys } from '../helpers/objectKeys';
import { CaveLevel1 } from '../levels/CaveLevel1';
import { Exit } from '../objects/Exit';
import { Hero } from '../objects/Hero';
import { CollectibleItem, ItemKey } from '../objects/Item';
import { Level } from '../objects/Level';
import { Resources } from '../Resources';
import { Sprite } from '../Sprite';
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
  | 'tree'
  | 'bush'
  | 'stones'
  | 'rock'
  | 'house';
type Coords = `${number},${number}`;
type Coords2D = { x: number; y: number };

type WorldTileConfig = { frame: number; frameSize: Coords2D };
type WorldTilesMap = Record<WorldTile, WorldTileConfig>;

type GameObjects = (
  | {
      type: 'Hero' | 'Exit';
    }
  | {
      type: 'CollectibleItem';
      item: ItemKey;
    }
) & { id: string } & Coords2D;

type LevelMap = {
  id: string;
  background: { resource: 'bgCave' | 'bgSky' | 'bgVolcano'; frameSize: Coords2D };
  horizontalTiles: number;
  verticalTiles: number;
  heroPosition: Coords2D;
  gameObjects: GameObjects[];
  walls: Coords[];
  tiles: Record<Coords, { tile: WorldTile; foregroundTile?: WorldTile } | null>;
};

const WORLD_TILES_MAP: WorldTilesMap = {
  grassUpperLeft: {
    frame: 0,
    frameSize: { x: 16, y: 16 },
  },
  grassUpper: {
    frame: 1,
    frameSize: { x: 16, y: 16 },
  },
  grassUpperRight: {
    frame: 2,
    frameSize: { x: 16, y: 16 },
  },
  grassLeft: {
    frame: 16,
    frameSize: { x: 16, y: 16 },
  },
  grass: {
    frame: 17,
    frameSize: { x: 16, y: 16 },
  },
  grassRight: {
    frame: 18,
    frameSize: { x: 16, y: 16 },
  },
  grassLowerLeft: {
    frame: 32,
    frameSize: { x: 16, y: 16 },
  },
  grassLower: {
    frame: 33,
    frameSize: { x: 16, y: 16 },
  },
  grassLowerRight: {
    frame: 34,
    frameSize: { x: 16, y: 16 },
  },
  grassPattern: {
    frame: 3,
    frameSize: { x: 16, y: 16 },
  },
  grassWater: {
    frame: 19,
    frameSize: { x: 16, y: 16 },
  },
  grassObstacle: {
    frame: 35,
    frameSize: { x: 16, y: 16 },
  },
  tree: {
    frame: 112,
    frameSize: { x: 16, y: 32 },
  },
  bush: {
    frame: 113,
    frameSize: { x: 16, y: 16 },
  },
  stones: {
    frame: 98,
    frameSize: { x: 16, y: 16 },
  },
  rock: {
    frame: 114,
    frameSize: { x: 16, y: 16 },
  },
  house: {
    frame: 115,
    frameSize: { x: 16, y: 16 },
  },
};

const TEST_LEVEL_MAP: LevelMap = {
  id: 'outdoorLevel1',
  background: { resource: 'bgSky', frameSize: { x: 320, y: 180 } },
  horizontalTiles: 13,
  verticalTiles: 6,
  heroPosition: { x: 3, y: 2 },
  gameObjects: [
    {
      type: 'Hero',
      id: 'hero',
      x: 3,
      y: 2,
    },
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
      x: 7,
      y: 6,
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
    '4,1',
    '5,1',
    '1,2',
    '2,2',
    '1,3',
    '2,3',
    '4,3',
    '5,3',
    '6,3',
    '7,3',
    '11,2',
    '12,2',
    '10,4',
    '11,4',
    '12,4',
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
    '4,0': { tile: 'grassUpperLeft' },
    '5,0': { tile: 'grassUpper' },
    '6,0': { tile: 'grassUpper' },
    '7,0': { tile: 'grassUpper' },
    '8,0': { tile: 'grassUpper' },
    '9,0': { tile: 'grassUpper' },
    '10,0': { tile: 'grassUpper' },
    '11,0': { tile: 'grassUpper' },
    '12,0': { tile: 'grassUpperRight' },
    '13,0': null,
    // Second row
    '0,1': { tile: 'grassUpperLeft' },
    '1,1': { tile: 'grassUpper' },
    '2,1': { tile: 'grassUpper' },
    '3,1': { tile: 'grassUpper' },
    '4,1': { tile: 'grass' },
    '5,1': { tile: 'grassObstacle' },
    '6,1': { tile: 'grassObstacle' },
    '7,1': { tile: 'grass' },
    '8,1': { tile: 'grass' },
    '9,1': { tile: 'grass' },
    '10,1': { tile: 'grass' },
    '11,1': { tile: 'grass' },
    '12,1': { tile: 'grass' },
    '13,1': { tile: 'grassUpperRight' },
    // Third row
    '0,2': { tile: 'grassLeft' },
    '1,2': { tile: 'grassObstacle' },
    '2,2': { tile: 'grassObstacle' },
    '3,2': { tile: 'grass' },
    '4,2': { tile: 'grass' },
    '5,2': { tile: 'grass' },
    '6,2': { tile: 'grass' },
    '7,2': { tile: 'grass' },
    '8,2': { tile: 'grass' },
    '9,2': { tile: 'grass' },
    '10,2': { tile: 'grass' },
    '11,2': { tile: 'grass', foregroundTile: 'tree' },
    '12,2': { tile: 'grass', foregroundTile: 'house' },
    '13,2': { tile: 'grassRight' },
    // Fourth row
    '0,3': { tile: 'grassLeft' },
    '1,3': { tile: 'grassObstacle' },
    '2,3': { tile: 'grassObstacle' },
    '3,3': { tile: 'grass' },
    '4,3': { tile: 'grassWater' },
    '5,3': { tile: 'grassWater' },
    '6,3': { tile: 'grassWater' },
    '7,3': { tile: 'grassWater' },
    '8,3': { tile: 'grass' },
    '9,3': { tile: 'grass' },
    '10,3': { tile: 'grass' },
    '11,3': { tile: 'grass' },
    '12,3': { tile: 'grass' },
    '13,3': { tile: 'grassRight' },
    // Fifth row
    '0,4': { tile: 'grassLeft' },
    '1,4': { tile: 'grass' },
    '2,4': { tile: 'grass' },
    '3,4': { tile: 'grass' },
    '4,4': { tile: 'grass' },
    '5,4': { tile: 'grass' },
    '6,4': { tile: 'grass' },
    '7,4': { tile: 'grass' },
    '8,4': { tile: 'grass' },
    '9,4': { tile: 'grass' },
    '10,4': { tile: 'grass', foregroundTile: 'rock' },
    '11,4': { tile: 'grass', foregroundTile: 'rock' },
    '12,4': { tile: 'grass', foregroundTile: 'rock' },
    '13,4': { tile: 'grassRight' },
    // Sixth row
    '0,5': { tile: 'grassLowerLeft' },
    '1,5': { tile: 'grassLower' },
    '2,5': { tile: 'grassLower' },
    '3,5': { tile: 'grassLower' },
    '4,5': { tile: 'grassLower' },
    '5,5': { tile: 'grassLower' },
    '6,5': { tile: 'grassLower' },
    '7,5': { tile: 'grassLower' },
    '8,5': { tile: 'grassLower' },
    '9,5': { tile: 'grassLower' },
    '10,5': { tile: 'grassLower' },
    '11,5': { tile: 'grassLower' },
    '12,5': { tile: 'grassLower' },
    '13,5': { tile: 'grassLowerRight' },
  },
};

export class LevelBuilder extends Level {
  constructor() {
    const { id, background, heroPosition } = TEST_LEVEL_MAP;

    super({ id, heroPosition: new Vector2(gridCells(heroPosition.x), gridCells(heroPosition.y)) });

    this.background = new Sprite({
      id: `${TEST_LEVEL_MAP.id}-background-sprite`,
      resource: Resources.images[background.resource],
      frameSize: new Vector2(background.frameSize.x, background.frameSize.y),
    });

    // Add tiles
    objectKeys(TEST_LEVEL_MAP.tiles).forEach((coords) => {
      const [x, y] = coords.split(',').map(Number);
      const tileData = TEST_LEVEL_MAP.tiles[coords];

      if (tileData) {
        const { frameSize, frame } = WORLD_TILES_MAP[tileData.tile];

        const worldTileSprite = new Sprite({
          id: `${TEST_LEVEL_MAP.id}-world-tile-${coords}`,
          resource: Resources.images.worldTiles,
          frameSize: new Vector2(frameSize.x, frameSize.y),
          hFrames: 16,
          vFrames: 9,
          frame,
          position: new Vector2(gridCells(x), gridCells(y)),
        });

        if (tileData.foregroundTile) {
          const foregroundTileData = WORLD_TILES_MAP[tileData.foregroundTile];

          const foregroundTileSprite = new Sprite({
            id: `${TEST_LEVEL_MAP.id}-foreground-tile-${coords}`,
            resource: Resources.images.worldTiles,
            frameSize: new Vector2(foregroundTileData.frameSize.x, foregroundTileData.frameSize.y),
            hFrames: 16,
            vFrames: 9,
            frame: foregroundTileData.frame,
            position: new Vector2(gridCells(x), gridCells(y)),
          });

          this.addChild(foregroundTileSprite);
        }

        worldTileSprite.drawLayer = 'FLOOR';
        this.addChild(worldTileSprite);
      }
    });

    // Add walls
    TEST_LEVEL_MAP.walls.forEach((wallCoords) => {
      const [x, y] = wallCoords.split(',').map(Number);
      this.walls.add(`${gridCells(x)},${gridCells(y)}`);
    });
  }

  ready(): void {
    // Add game objects
    TEST_LEVEL_MAP.gameObjects.forEach((gameObject) => {
      const { id, type, x, y } = gameObject;

      if (type === 'Hero') {
        const hero = new Hero({
          id: `${TEST_LEVEL_MAP.id}-hero`,
          x: gridCells(x),
          y: gridCells(y),
        });
        this.addChild(hero);
      }

      if (type === 'Exit') {
        const exit = new Exit({
          id: `${TEST_LEVEL_MAP.id}-exit`,
          x: gridCells(x),
          y: gridCells(y),
        });
        this.addChild(exit);
      }

      if (type === 'CollectibleItem') {
        const collectibleItem = new CollectibleItem({
          id: `${TEST_LEVEL_MAP.id}-${id}`,
          item: gameObject.item,
          x: gridCells(x),
          y: gridCells(y),
        });
        this.addChild(collectibleItem);
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
