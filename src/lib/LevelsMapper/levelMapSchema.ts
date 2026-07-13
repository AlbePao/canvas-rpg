import { z } from 'zod';
import { CHEST_STATUSES } from '../../objects/Chest';
import type {
  InteractionBattleConfig,
  InteractionConfig,
  InteractionContentConfig,
} from '../../objects/InteractiveObject';
import { ITEM_KEYS } from '../../objects/Item';
import type { MovableObjectBehavior } from '../../objects/MovableObject';
import type { NpcBehavior } from '../../objects/Npc';
import type { SelectionOption } from '../../objects/SelectionBox';
import type { Coords, Coords2D } from '../../types/coords';
import { DIRECTIONS } from '../../types/directions';
import { GAME_OBJECT_DRAW_LAYERS } from '../GameObject';
import type {
  LevelChestItem,
  LevelCollectibleItem,
  LevelDecoration,
  LevelExit,
  LevelMap,
  LevelNpc,
  LevelObjects,
} from '../LevelBuilder';
import { NPC_KEYS, WORLD_BACKGROUNDS } from '../Resources';
import { LEVEL_DECORATION_TILESET, LEVEL_TILES_NAME } from '../Tileset';

/**
 * Zod schema for validating LevelMap JSON data
 * Inferred from the LevelMap TypeScript interface to ensure consistency
 */

export const LevelsIdsScrema = z.array(z.string()) satisfies z.ZodType<string[]>;

const LevelIdSchema = z.string() satisfies z.ZodType<string>;

const Coords2DSchema = z.object({
  x: z.number().int(),
  y: z.number().int(),
}) satisfies z.ZodType<Coords2D>;

const LevelBackgroundSchema = z.object({
  resource: z.enum(WORLD_BACKGROUNDS),
  frameSize: Coords2DSchema,
}) satisfies z.ZodType<LevelMap['background']>;

const SelectionOptionSchema = z.object({
  key: z.string(),
  text: z.string(),
  response: z.array(z.string()).optional(),
  addsFlag: z.string().optional(),
  exclude: z.array(z.string()).optional(),
  include: z.array(z.string()).optional(),
  itemKey: z.enum(ITEM_KEYS).optional(),
}) satisfies z.ZodType<SelectionOption>;

const InteractionContentConfigSchema = z
  .object({
    text: z.array(z.string()),
    requires: z.array(z.string()).optional(),
    bypass: z.array(z.string()).optional(),
  })
  .and(
    z.union([
      // First branch: has "options", but NOT "addsFlag" or "itemKey"
      z.object({
        options: z.array(SelectionOptionSchema).optional(),
        addsFlag: z.never().optional(),
        itemKey: z.never().optional(),
        battle: z.never().optional(),
      }),
      // Second branch: does NOT have "options", but can have "addsFlag" and "itemKey"
      z.object({
        options: z.never().optional(),
        addsFlag: z.string().optional(),
        itemKey: z.enum(ITEM_KEYS).optional(),
        battle: z.never().optional(),
      }),
      // Third branch: does NOT have "options", "addsFlag", or "itemKey", but has "battle"
      z.object({
        options: z.never().optional(),
        addsFlag: z.never().optional(),
        itemKey: z.never().optional(),
        battle: z.object({
          background: z.enum(WORLD_BACKGROUNDS),
          addsFlag: z.string(),
          winData: z.object({
            text: z.array(z.string()),
            money: z.number().int(),
            itemKeys: z.array(z.enum(ITEM_KEYS)),
            experience: z.number().int(),
          }),
        }) satisfies z.ZodType<InteractionBattleConfig>,
      }),
    ]),
  ) satisfies z.ZodType<InteractionContentConfig>;

const InteractionConfigSchema = z.object({
  portraitFrame: z.number().int().nullable().optional(),
  content: z.array(InteractionContentConfigSchema),
}) satisfies z.ZodType<InteractionConfig>;

const MovableObjectBehaviorSchema = z.object({
  type: z.unknown(),
  direction: z.enum(DIRECTIONS),
}) satisfies z.ZodType<MovableObjectBehavior>;

const LevelExitSchema = z.object({
  type: z.literal('Exit'),
  id: z.string(),
  newLevelId: LevelIdSchema,
  x: z.number().int(),
  y: z.number().int(),
  behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
  newHeroPosition: Coords2DSchema,
}) satisfies z.ZodType<LevelExit>;

const LevelCollectibleItemSchema = z.object({
  type: z.literal('CollectibleItem'),
  id: z.string(),
  itemKey: z.enum(ITEM_KEYS),
  x: z.number().int(),
  y: z.number().int(),
  behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
  skipCollectAnimation: z.boolean().optional(),
}) satisfies z.ZodType<LevelCollectibleItem>;

const LevelDecorationSchema = z.object({
  type: z.literal('Decoration'),
  id: z.string(),
  key: z.enum(LEVEL_DECORATION_TILESET),
  x: z.number().int(),
  y: z.number().int(),
  isSolid: z.boolean().optional(),
  drawLayer: z.enum(GAME_OBJECT_DRAW_LAYERS).optional(),
  behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
}) satisfies z.ZodType<LevelDecoration>;

const LevelChestSchema = z.object({
  type: z.literal('Chest'),
  id: z.string(),
  x: z.number().int(),
  y: z.number().int(),
  behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
  status: z.enum(CHEST_STATUSES).optional(),
  removeAfterLoot: z.boolean().optional(),
  interactionConfig: InteractionConfigSchema,
}) satisfies z.ZodType<LevelChestItem>;

const NpcBehaviorSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('walk'),
    direction: z.enum(DIRECTIONS),
    speed: z.number().optional(),
  }),
  z.object({
    type: z.literal('stand'),
    direction: z.enum(DIRECTIONS),
    duration: z.number().optional(),
  }),
]) satisfies z.ZodType<NpcBehavior>;

const LevelNpcSchema = z.object({
  type: z.literal('Npc'),
  id: z.string(),
  x: z.number().int(),
  y: z.number().int(),
  behaviorConfig: z.array(NpcBehaviorSchema).optional(),
  npc: z.enum(NPC_KEYS),
  interactionConfig: InteractionConfigSchema,
}) satisfies z.ZodType<LevelNpc>;

const LevelObjectsSchema = z.union([
  LevelCollectibleItemSchema,
  LevelDecorationSchema,
  LevelExitSchema,
  LevelChestSchema,
  LevelNpcSchema,
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
  background: LevelBackgroundSchema.optional(),
  heroDefaultPosition: Coords2DSchema,
  gameObjects: z.array(LevelObjectsSchema),
  walls: z.array(WallCoordSchema),
  tiles: z.record(WallCoordSchema, z.enum(LEVEL_TILES_NAME).nullable()),
}) satisfies z.ZodType<LevelMap>;

export type LevelMapJsonType = z.infer<typeof LevelMapJsonSchema>;
