import { z } from 'zod';
import { CHEST_STATUSES } from '../../objects/Chest';
import type { DecorationFrames } from '../../objects/Decoration';
import type {
  InteractionBattleConfig,
  InteractionConfig,
  InteractionContentConfig,
} from '../../objects/InteractiveObject';
import type { GridCoords } from '../../objects/Level';
import type { MovableObjectBehavior } from '../../objects/MovableObject';
import type { NpcBehavior } from '../../objects/Npc';
import type { SelectionOption } from '../../objects/SelectionBox';
import { DIRECTIONS } from '../../types/directions';
import {
  ANIMATION_COLLECT_FRAMES,
  ANIMATION_STANDING_FRAMES,
  ANIMATION_WALKING_FRAMES,
  type AnimationFrame,
} from '../Animations';
import type { AnimationConfig, FrameData } from '../FrameIndexPattern';
import { GAME_OBJECT_DRAW_LAYERS } from '../GameObject';
import type {
  AnimationRegistry,
  AssetData,
  AssetsToLoad,
  CharFrameData,
  CharsFrameMapRegistry,
  DecorationFramesMapRegistry,
  ItemData,
  ItemsRegistry,
  TilesFrameMapRegistry,
} from '../GameRegistry';
import { BASE_RESOURCE_KEYS, ITEM_TYPES } from '../GameRegistry';
import type {
  LevelBackground,
  LevelChestItem,
  LevelCollectibleItem,
  LevelDecoration,
  LevelExit,
  LevelMap,
  LevelNpc,
  LevelObjects,
} from '../LevelBuilder';
import type { Coords2D } from '../Vector2';
import type { LevelSchemas, SchemaWithKeys } from './gameLoader.types';

/**
 * Zod schema for validating JSON data
 * Inferred from the TypeScript interface to ensure consistency
 */

export const LevelsIdsSchema = z.array(z.string()) satisfies z.ZodType<string[]>;

export const Coords2DSchema = z
  .object({
    x: z.number().int(),
    y: z.number().int(),
  })
  .strict() satisfies z.ZodType<Coords2D>;

export const createAnimationsSchema = (data: unknown): SchemaWithKeys<AnimationRegistry> => {
  const AnimationFrameSchema = z
    .object({
      time: z.number().int(),
      frame: z.number().int(),
    })
    .strict() satisfies z.ZodType<FrameData>;

  const AnimationConfigSchema = z
    .object({
      duration: z.number().int(),
      frames: z.array(AnimationFrameSchema),
    })
    .strict() satisfies z.ZodType<AnimationConfig>;

  const CharacterAnimationSchema = z
    .object(
      Object.fromEntries(
        [...ANIMATION_STANDING_FRAMES, ...ANIMATION_WALKING_FRAMES, ...ANIMATION_COLLECT_FRAMES].map((frame) => [
          frame,
          AnimationConfigSchema,
        ]),
      ),
    )
    .partial()
    .strict() satisfies z.ZodType<Partial<Record<AnimationFrame, AnimationConfig>>>;

  const AnimationRegistrySchema = z
    .object({
      npc: CharacterAnimationSchema,
      hero: CharacterAnimationSchema,
      tiles: z.record(z.string(), AnimationConfigSchema) satisfies z.ZodType<Record<string, AnimationConfig>>,
    })
    .strict() satisfies z.ZodType<AnimationRegistry>;

  const parsedData = AnimationRegistrySchema.parse(data);
  const animationKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: AnimationRegistrySchema, keys: animationKeys };
};

export const createAssetsSchema = (data: unknown): SchemaWithKeys<AssetsToLoad> => {
  const AssetDataSchema = z
    .object({
      src: z.string(),
      frameSize: Coords2DSchema.optional(),
      position: Coords2DSchema.optional(),
      hFrames: z.number().int().optional(),
      vFrames: z.number().int().optional(),
    })
    .strict() satisfies z.ZodType<AssetData>;

  const AssetsToLoadSchema = z
    .object(Object.fromEntries([...BASE_RESOURCE_KEYS].map((key) => [key, AssetDataSchema])))
    .catchall(AssetDataSchema);

  const parsedData = AssetsToLoadSchema.parse(data);
  const assetsKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: AssetsToLoadSchema, keys: assetsKeys };
};

export const createCharsFrameMapSchema = (data: unknown): SchemaWithKeys<CharsFrameMapRegistry> => {
  const CharsFrameMapSchema = z.record(
    z.string(),
    z.object({ frame: z.number().int(), width: z.number().int() }).strict() satisfies z.ZodType<CharFrameData>,
  ) satisfies z.ZodType<CharsFrameMapRegistry>;
  const parsedData = CharsFrameMapSchema.parse(data);
  const charsKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: CharsFrameMapSchema, keys: charsKeys };
};

export const createDecorationsFrameMapSchema = (data: unknown): SchemaWithKeys<DecorationFramesMapRegistry> => {
  const DecorationSchema = z
    .object({
      baseFrame: z.number().int(),
      size: Coords2DSchema.optional(),
    })
    .strict() satisfies z.ZodType<DecorationFrames>;

  const DecorationFramesMapSchema = z.record(
    z.string(),
    DecorationSchema,
  ) satisfies z.ZodType<DecorationFramesMapRegistry>;

  const parsedData = DecorationFramesMapSchema.parse(data);
  const decorationKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: DecorationFramesMapSchema, keys: decorationKeys };
};

export const createItemDataSchema = (itemKeysSchema: z.ZodType<string>): z.ZodType<ItemData> =>
  z
    .object({
      itemKey: itemKeysSchema,
      name: z.string(),
      type: z.enum(ITEM_TYPES),
      frame: z.number().int(),
    })
    .strict() satisfies z.ZodType<ItemData>;

export const createItemsRegistrySchema = (data: unknown): SchemaWithKeys<ItemsRegistry> => {
  const parsedData = z.record(z.string(), z.unknown()).parse(data);
  // We use .nonempty() because z.enum needs at least one element
  const itemKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  const ItemKeysSchema = z.enum(itemKeys) satisfies z.ZodType<string>;
  const ItemDataSchema = createItemDataSchema(ItemKeysSchema) satisfies z.ZodType<ItemData>;
  const schema = z.record(ItemKeysSchema, ItemDataSchema) satisfies z.ZodType<ItemsRegistry>;

  return { schema, keys: itemKeys };
};

export const createTilesFrameMapSchema = (data: unknown): SchemaWithKeys<TilesFrameMapRegistry> => {
  const TilesFrameMapSchema = z.record(z.string(), z.number().int()) satisfies z.ZodType<TilesFrameMapRegistry>;
  const parsedData = TilesFrameMapSchema.parse(data);
  const tileKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: TilesFrameMapSchema, keys: tileKeys };
};

/**
 * Generate a Zod schema for validating LevelMap JSON data dynamically based on the provided schemas.
 */
export const createLevelMapSchema = (schemas: LevelSchemas): z.ZodType<LevelMap> => {
  const { decorationKeys, itemKeys, levelsIds, tileKeys } = schemas;

  const decorationKeysSchema = z.enum(decorationKeys);
  const itemKeysSchema = z.enum(itemKeys);
  const levelsIdsSchema = z.enum(levelsIds);
  const tileKeysSchema = z.enum(tileKeys);

  const LevelBackgroundSchema = z
    .object({
      resource: z.string(),
      frameSize: Coords2DSchema,
    })
    .strict() satisfies z.ZodType<LevelBackground>;

  const SelectionOptionSchema = z
    .object({
      key: z.string(),
      text: z.string(),
      response: z.array(z.string()).optional(),
      addsFlag: z.string().optional(),
      exclude: z.array(z.string()).optional(),
      include: z.array(z.string()).optional(),
      itemKey: itemKeysSchema.optional(),
    })
    .strict() satisfies z.ZodType<SelectionOption>;

  const InteractionContentConfigSchema = z
    .object({
      text: z.array(z.string()),
      requires: z.array(z.string()).optional(),
      bypass: z.array(z.string()).optional(),
    })
    .strict()
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
          itemKey: itemKeysSchema.optional(),
          battle: z.never().optional(),
        }),
        // Third branch: does NOT have "options", "addsFlag", or "itemKey", but has "battle"
        z.object({
          options: z.never().optional(),
          addsFlag: z.never().optional(),
          itemKey: z.never().optional(),
          battle: z
            .object({
              background: z.string(),
              addsFlag: z.string(),
              winData: z
                .object({
                  text: z.array(z.string()),
                  money: z.number().int(),
                  itemKeys: z.array(itemKeysSchema),
                  experience: z.number().int(),
                })
                .strict(),
            })
            .strict() satisfies z.ZodType<InteractionBattleConfig>,
        }),
      ]),
    ) satisfies z.ZodType<InteractionContentConfig>;

  const InteractionConfigSchema = z
    .object({
      portraitFrame: z.number().int().nullable().optional(),
      content: z.array(InteractionContentConfigSchema),
    })
    .strict() satisfies z.ZodType<InteractionConfig>;

  const MovableObjectBehaviorSchema = z
    .object({
      type: z.unknown(),
      direction: z.enum(DIRECTIONS),
    })
    .strict() satisfies z.ZodType<MovableObjectBehavior>;

  const LevelExitSchema = z
    .object({
      type: z.literal('Exit'),
      id: z.string(),
      newLevelId: levelsIdsSchema,
      x: z.number().int(),
      y: z.number().int(),
      behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
      newHeroPosition: Coords2DSchema,
    })
    .strict() satisfies z.ZodType<LevelExit>;

  const LevelCollectibleItemSchema = z
    .object({
      type: z.literal('CollectibleItem'),
      id: z.string(),
      itemKey: itemKeysSchema,
      x: z.number().int(),
      y: z.number().int(),
      behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
      skipCollectAnimation: z.boolean().optional(),
    })
    .strict() satisfies z.ZodType<LevelCollectibleItem>;

  const LevelDecorationSchema = z
    .object({
      type: z.literal('Decoration'),
      id: z.string(),
      key: decorationKeysSchema,
      x: z.number().int(),
      y: z.number().int(),
      isSolid: z.boolean().optional(),
      drawLayer: z.enum(GAME_OBJECT_DRAW_LAYERS).optional(),
      behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
    })
    .strict() satisfies z.ZodType<LevelDecoration>;

  const LevelChestSchema = z
    .object({
      type: z.literal('Chest'),
      id: z.string(),
      x: z.number().int(),
      y: z.number().int(),
      behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
      status: z.enum(CHEST_STATUSES).optional(),
      removeAfterLoot: z.boolean().optional(),
      interactionConfig: InteractionConfigSchema,
    })
    .strict() satisfies z.ZodType<LevelChestItem>;

  const NpcBehaviorSchema = z.discriminatedUnion('type', [
    z
      .object({
        type: z.literal('walk'),
        direction: z.enum(DIRECTIONS),
        speed: z.number().optional(),
      })
      .strict(),
    z
      .object({
        type: z.literal('stand'),
        direction: z.enum(DIRECTIONS),
        duration: z.number().optional(),
      })
      .strict(),
  ]) satisfies z.ZodType<NpcBehavior>;

  const LevelNpcSchema = z
    .object({
      type: z.literal('Npc'),
      id: z.string(),
      x: z.number().int(),
      y: z.number().int(),
      behaviorConfig: z.array(NpcBehaviorSchema).optional(),
      npc: z.string(),
      facingDirection: z.enum(DIRECTIONS).optional(),
      interactionConfig: InteractionConfigSchema,
    })
    .strict() satisfies z.ZodType<LevelNpc>;

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
  ]) satisfies z.ZodType<GridCoords>;

  /**
   * Main LevelMap schema for JSON validation
   * Each level has its own JSON file that must conform to this schema
   * Inferred from the LevelMap TypeScript interface
   */
  return z
    .object({
      id: levelsIdsSchema,
      background: LevelBackgroundSchema.optional(),
      heroDefaultPosition: Coords2DSchema,
      heroStartPosition: Coords2DSchema.optional(),
      heroFacingDirection: z.enum(DIRECTIONS).optional(),
      gameObjects: z.array(LevelObjectsSchema),
      walls: z.array(WallCoordSchema),
      tiles: z.record(WallCoordSchema, tileKeysSchema.nullable()),
    })
    .strict() satisfies z.ZodType<LevelMap>;
};
