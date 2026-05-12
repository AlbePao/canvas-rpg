import { z } from 'zod';
import type { ItemKey } from '../../objects/Item';
import type { Coords, Coords2D } from '../../types/coords';
import type { GameObjectDrawLayer } from '../GameObject';
import {
  type LevelCollectibleItem,
  type LevelDecoration,
  type LevelExit,
  type LevelMap,
  type LevelObjects,
  type LevelsId,
  type WorldBackground,
  type WorldTile,
} from '../LevelBuilder';

export const LEVELS_IDS: LevelsId[] = ['grass1Level', 'testTilesLevel'] as const;
const GAME_OBJECT_DRAW_LAYERS: GameObjectDrawLayer[] = ['HUD', 'WORLD_TOP', 'FLOOR'] as const;
const WORLD_BACKGROUNDS: WorldBackground[] = ['bgCave', 'bgSky', 'bgVolcano'] as const;

const WORLD_TILES: WorldTile[] = [
  // Grass 1
  'grass1UpperLeft',
  'grass1Upper',
  'grass1UpperRight',
  'grass1',
  'grass1Left',
  'grass1Right',
  'grass1LowerLeft',
  'grass1Lower',
  'grass1LowerRight',
  'grass1Pattern',
  'grass1Water',
  'grass1Obstacle',
  // Purple
  'purpleUpperLeft',
  'purpleUpper',
  'purpleUpperRight',
  'purple',
  'purpleLeft',
  'purpleRight',
  'purpleLowerLeft',
  'purpleLower',
  'purpleLowerRight',
  'purplePattern',
  'purpleWater',
  'purpleObstacle',
  // City 1
  'city1UpperLeft',
  'city1Upper',
  'city1UpperRight',
  'city1',
  'city1Left',
  'city1Right',
  'city1LowerLeft',
  'city1Lower',
  'city1LowerRight',
  'city1Pattern',
  'city1Water',
  'city1Obstacle',
  // Orange
  'orangeUpperLeft',
  'orangeUpper',
  'orangeUpperRight',
  'orange',
  'orangeLeft',
  'orangeRight',
  'orangeLowerLeft',
  'orangeLower',
  'orangeLowerRight',
  'orangePattern',
  'orangeWater',
  'orangeObstacle',
  // Red
  'redUpperLeft',
  'redUpper',
  'redUpperRight',
  'red',
  'redLeft',
  'redRight',
  'redLowerLeft',
  'redLower',
  'redLowerRight',
  'redPattern',
  'redWater',
  'redObstacle',
  // Blue
  'blueUpperLeft',
  'blueUpper',
  'blueUpperRight',
  'blue',
  'blueLeft',
  'blueRight',
  'blueLowerLeft',
  'blueLower',
  'blueLowerRight',
  'bluePattern',
  'blueWater',
  'blueObstacle',
  // Grass 2
  'grass2UpperLeft',
  'grass2Upper',
  'grass2UpperRight',
  'grass2',
  'grass2Left',
  'grass2Right',
  'grass2LowerLeft',
  'grass2Lower',
  'grass2LowerRight',
  'grass2Pattern',
  'grass2Water',
  'grass2Obstacle',
  // City 2
  'city2UpperLeft',
  'city2Upper',
  'city2UpperRight',
  'city2',
  'city2Left',
  'city2Right',
  'city2LowerLeft',
  'city2Lower',
  'city2LowerRight',
  'city2Pattern',
  'city2Water',
  'city2Obstacle',
  // Alternative floors
  'water',
  'lava',
  // Decorations
  'treeUpper',
  'treeLower',
  'bush1',
  'stones',
  'rock',
  'house1',
  'buildings',
  'house2',
  'house3',
  'house4',
  'bush2',
  'tiles',
  'rocks',
  'house5',
  'squareYellow',
  'squareCyan',
  'squareViolet',
  'squareOrange',
] as const;

const ITEM_KEYS: ItemKey[] = [
  'hammer1',
  'hammer2',
  'slingshot1',
  'slingshot2',
  'rod1',
  'rod2',
  'potion1',
  'potion2',
  'heart',
  'sword',
] as const;

/**
 * Zod schema for validating LevelMap JSON data
 * Inferred from the LevelMap TypeScript interface to ensure consistency
 */

const LevelIdSchema = z.enum(LEVELS_IDS) satisfies z.ZodType<LevelsId>;

const Coords2DSchema = z.object({
  x: z.number().int(),
  y: z.number().int(),
}) satisfies z.ZodType<Coords2D>;

const LevelBackgroundSchema = z.object({
  resource: z.enum(WORLD_BACKGROUNDS),
  frameSize: Coords2DSchema,
}) satisfies z.ZodType<LevelMap['background']>;

const LevelExitSchema = z.object({
  id: z.string(),
  newLevelId: LevelIdSchema,
  x: z.number().int(),
  y: z.number().int(),
  heroNewPosition: Coords2DSchema,
}) satisfies z.ZodType<LevelExit>;

const LevelCollectibleItemSchema = z.object({
  type: z.literal('CollectibleItem'),
  id: z.string(),
  item: z.enum(ITEM_KEYS),
  x: z.number().int(),
  y: z.number().int(),
}) satisfies z.ZodType<LevelCollectibleItem>;

const LevelDecorationSchema = z.object({
  type: z.literal('Decoration'),
  id: z.string(),
  key: z.enum(WORLD_TILES),
  x: z.number().int(),
  y: z.number().int(),
  isSolid: z.boolean().optional(),
  drawLayer: z.enum(GAME_OBJECT_DRAW_LAYERS).optional(),
}) satisfies z.ZodType<LevelDecoration>;

const LevelObjectsSchema = z.union([
  LevelCollectibleItemSchema,
  LevelDecorationSchema,
]) satisfies z.ZodType<LevelObjects>;

const WallCoordSchema = z.templateLiteral([
  z.number().int(),
  z.literal(','),
  z.number().int(),
]) satisfies z.ZodType<Coords>;

/**
 * Main LevelMap schema for JSON validation
 * Each level has its own JSON file that must conform to this schema
 * Inferred from the LevelMap TypeScript interface
 */
export const LevelMapJsonSchema = z.object({
  id: LevelIdSchema,
  background: LevelBackgroundSchema,
  heroDefaultPosition: Coords2DSchema,
  gameObjects: z.array(LevelObjectsSchema),
  exits: z.array(LevelExitSchema),
  walls: z.array(WallCoordSchema),
  tiles: z.record(WallCoordSchema, z.enum(WORLD_TILES).nullable()),
}) satisfies z.ZodType<LevelMap>;

export type LevelMapJsonType = z.infer<typeof LevelMapJsonSchema>;
