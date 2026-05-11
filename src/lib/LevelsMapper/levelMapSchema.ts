import { z } from 'zod';
import { ITEM_KEYS } from '../../objects/Item';
import type { Coords, Coords2D } from '../../types/coords';
import { GAME_OBJECT_DRAW_LAYERS } from '../GameObject';
import {
  LEVELS_IDS,
  WORLD_BACKGROUNDS,
  WORLD_TILES,
  type LevelCollectibleItem,
  type LevelDecoration,
  type LevelExit,
  type LevelMap,
  type LevelObjects,
  type LevelsIds,
} from '../LevelBuilder';

/**
 * Zod schema for validating LevelMap JSON data
 * Inferred from the LevelMap TypeScript interface to ensure consistency
 */

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
  newLevelId: z.string(), // Only string references when loading from JSON
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

const LevelIdSchema = z.enum(LEVELS_IDS) satisfies z.ZodType<LevelsIds>;

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
