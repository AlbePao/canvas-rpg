import type { ChestConfig } from '../../objects/Chest';
import type { CollectibleItemConfig } from '../../objects/Item';
import type { LevelConfig } from '../../objects/Level';
import type { NpcConfig } from '../../objects/Npc';
import type { Coords, Coords2D } from '../../types/coords';
import type { GameObjectConfig, GameObjectDrawLayer } from '../GameObject';

export type LevelsId = 'grass1Level' | 'purpleLevel' | 'testTilesLevel';
export type WorldBackground = 'bgCave' | 'bgSky' | 'bgVolcano';
export type WorldTile =
  // Grass 1
  | 'grass1UpperLeft'
  | 'grass1Upper'
  | 'grass1UpperRight'
  | 'grass1'
  | 'grass1Left'
  | 'grass1Right'
  | 'grass1LowerLeft'
  | 'grass1Lower'
  | 'grass1LowerRight'
  | 'grass1Pattern'
  | 'grass1Water'
  | 'grass1Obstacle'
  // Purple
  | 'purpleUpperLeft'
  | 'purpleUpper'
  | 'purpleUpperRight'
  | 'purple'
  | 'purpleLeft'
  | 'purpleRight'
  | 'purpleLowerLeft'
  | 'purpleLower'
  | 'purpleLowerRight'
  | 'purplePattern'
  | 'purpleWater'
  | 'purpleObstacle'
  // City 1
  | 'city1UpperLeft'
  | 'city1Upper'
  | 'city1UpperRight'
  | 'city1'
  | 'city1Left'
  | 'city1Right'
  | 'city1LowerLeft'
  | 'city1Lower'
  | 'city1LowerRight'
  | 'city1Pattern'
  | 'city1Water'
  | 'city1Obstacle'
  // Orange
  | 'orangeUpperLeft'
  | 'orangeUpper'
  | 'orangeUpperRight'
  | 'orange'
  | 'orangeLeft'
  | 'orangeRight'
  | 'orangeLowerLeft'
  | 'orangeLower'
  | 'orangeLowerRight'
  | 'orangePattern'
  | 'orangeWater'
  | 'orangeObstacle'
  // Red
  | 'redUpperLeft'
  | 'redUpper'
  | 'redUpperRight'
  | 'red'
  | 'redLeft'
  | 'redRight'
  | 'redLowerLeft'
  | 'redLower'
  | 'redLowerRight'
  | 'redPattern'
  | 'redWater'
  | 'redObstacle'
  // Blue
  | 'blueUpperLeft'
  | 'blueUpper'
  | 'blueUpperRight'
  | 'blue'
  | 'blueLeft'
  | 'blueRight'
  | 'blueLowerLeft'
  | 'blueLower'
  | 'blueLowerRight'
  | 'bluePattern'
  | 'blueWater'
  | 'blueObstacle'
  // Grass 2
  | 'grass2UpperLeft'
  | 'grass2Upper'
  | 'grass2UpperRight'
  | 'grass2'
  | 'grass2Left'
  | 'grass2Right'
  | 'grass2LowerLeft'
  | 'grass2Lower'
  | 'grass2LowerRight'
  | 'grass2Pattern'
  | 'grass2Water'
  | 'grass2Obstacle'
  // City 2
  | 'city2UpperLeft'
  | 'city2Upper'
  | 'city2UpperRight'
  | 'city2'
  | 'city2Left'
  | 'city2Right'
  | 'city2LowerLeft'
  | 'city2Lower'
  | 'city2LowerRight'
  | 'city2Pattern'
  | 'city2Water'
  | 'city2Obstacle'
  // Alternative floors
  | 'water'
  | 'lava'
  // Decorations
  | 'treeUpper'
  | 'treeLower'
  | 'bush1'
  | 'stones'
  | 'rock'
  | 'house1'
  | 'buildings'
  | 'house2'
  | 'house3'
  | 'house4'
  | 'bush2'
  | 'tiles'
  | 'rocks'
  | 'house5'
  | 'squareYellow'
  | 'squareCyan'
  | 'squareViolet'
  | 'squareOrange';

export type WorldTilesFrameMap = Record<WorldTile, number>;

export type LevelBuilderConfig = LevelConfig & {
  id: LevelsId;
};

export type LevelCollectibleItem = CollectibleItemConfig & {
  type: 'CollectibleItem';
};

export type LevelChestItem = ChestConfig & {
  type: 'Chest';
};

export type LevelNpc = NpcConfig & {
  type: 'Npc';
};

export type LevelDecoration = GameObjectConfig & {
  type: 'Decoration';
  key: WorldTile;
  isSolid?: boolean;
  drawLayer?: GameObjectDrawLayer;
};

export type LevelObjects = LevelCollectibleItem | LevelChestItem | LevelNpc | LevelDecoration;

export type LevelExit = GameObjectConfig & {
  newLevelId: LevelsId;
  heroNewPosition: Coords2D;
};

export interface LevelMap {
  id: LevelsId;
  background: {
    resource: WorldBackground;
    frameSize: Coords2D;
  };
  heroDefaultPosition: Coords2D;
  gameObjects: LevelObjects[];
  exits: LevelExit[];
  walls: Coords[];
  tiles: Record<Coords, WorldTile | null>;
}
