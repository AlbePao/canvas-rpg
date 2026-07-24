import { z } from 'zod';
import { CHEST_STATUSES } from '../../objects/Chest';
import type { DecorationFrames } from '../../objects/Decoration';
import { DIRECTIONS } from '../../types/directions';
import type { ReadonlyRecord } from '../../types/readonlyRecord';
import {
  ANIMATION_COLLECT_FRAMES,
  ANIMATION_STANDING_FRAMES,
  ANIMATION_WALKING_FRAMES,
  type AnimationFrame,
} from '../Animations';
import type { AnimationConfig, FrameData } from '../FrameIndexPattern';
import type {
  AnimationRegistry,
  AssetData,
  AssetsToLoad,
  CharFrameData,
  CharsFrameMapRegistry,
  DecorationFramesMapRegistry,
  ItemData,
  ItemsRegistry,
} from '../GameRegistry';
import { BASE_RESOURCE_KEYS, ITEM_TYPES } from '../GameRegistry';
import { Coords2DSchema } from './common.schema';
import type { SchemaWithKeys } from './gameSchemas.types';

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
    .strict() satisfies z.ZodType<Partial<ReadonlyRecord<AnimationFrame, AnimationConfig>>>;

  const AnimationRegistrySchema = z
    .object({
      npc: CharacterAnimationSchema,
      hero: CharacterAnimationSchema,
      tiles: z.record(z.string(), AnimationConfigSchema) satisfies z.ZodType<ReadonlyRecord<string, AnimationConfig>>,
    })
    .strict() satisfies z.ZodType<AnimationRegistry>;

  const parsedData = AnimationRegistrySchema.parse(data);
  const animationKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: AnimationRegistrySchema, keys: animationKeys };
};

export const createArrowDirectionFrameMapSchema = (data: unknown): SchemaWithKeys<ReadonlyRecord<string, number>> => {
  const ArrowDirectionFrameMapSchema = z.record(z.enum(DIRECTIONS), z.number().int()) satisfies z.ZodType<
    ReadonlyRecord<string, number>
  >;
  const parsedData = ArrowDirectionFrameMapSchema.parse(data);
  const arrowDirectionKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: ArrowDirectionFrameMapSchema, keys: arrowDirectionKeys };
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

export const createChestStatusFrameMapSchema = (data: unknown): SchemaWithKeys<ReadonlyRecord<string, number>> => {
  const ChestStatusFrameMapSchema = z.record(z.enum(CHEST_STATUSES), z.number().int()) satisfies z.ZodType<
    ReadonlyRecord<string, number>
  >;
  const parsedData = ChestStatusFrameMapSchema.parse(data);
  const chestStatusKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: ChestStatusFrameMapSchema, keys: chestStatusKeys };
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

export const createItemsRegistrySchema = (data: unknown): SchemaWithKeys<ItemsRegistry> => {
  const parsedData = z.record(z.string(), z.unknown()).parse(data);
  // We use .nonempty() because z.enum needs at least one element
  const itemKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  const ItemKeysSchema = z.enum(itemKeys) satisfies z.ZodType<string>;
  const ItemDataSchema = z
    .object({
      itemKey: ItemKeysSchema,
      name: z.string(),
      type: z.enum(ITEM_TYPES),
      frame: z.number().int(),
    })
    .strict() satisfies z.ZodType<ItemData>;
  const schema = z.record(ItemKeysSchema, ItemDataSchema) satisfies z.ZodType<ItemsRegistry>;

  return { schema, keys: itemKeys };
};

export const createTilesFrameMapSchema = (data: unknown): SchemaWithKeys<ReadonlyRecord<string, number>> => {
  const TilesFrameMapSchema = z.record(z.string(), z.number().int()) satisfies z.ZodType<
    ReadonlyRecord<string, number>
  >;
  const parsedData = TilesFrameMapSchema.parse(data);
  const tileKeys = z.array(z.string()).nonempty().parse(Object.keys(parsedData));

  return { schema: TilesFrameMapSchema, keys: tileKeys };
};
