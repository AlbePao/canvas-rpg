import { z } from 'zod';
import type { LevelBackground, LevelMap } from '../../objects/LevelBuilder';
import { DIRECTIONS } from '../../types/directions';
import { Coords2DSchema, WallCoordSchema } from './common.schema';
import type { LevelSchemas } from './gameSchemas.types';
import { createLevelObjectsSchema } from './levelObjects.schema';

export const createLevelMapSchema = (schemas: LevelSchemas): z.ZodType<LevelMap> => {
  const levelsIdsSchema = z.enum(schemas.levelsIds);
  const tileKeysSchema = z.enum(schemas.tileKeys);

  const LevelObjectsSchema = createLevelObjectsSchema(schemas);

  const LevelBackgroundSchema = z
    .object({
      resource: z.string(),
      frameSize: Coords2DSchema,
    })
    .strict() satisfies z.ZodType<LevelBackground>;

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
