import { z } from 'zod';
import { CHEST_STATUSES } from '../../objects/Chest';
import type { LevelObjects } from '../../objects/LevelBuilder';
import type { NpcBehavior } from '../../objects/Npc';
import { DIRECTIONS } from '../../types/directions';
import { GAME_OBJECT_DRAW_LAYERS } from '../GameObject';
import { Coords2DSchema, MovableObjectBehaviorSchema } from './common.schema';
import type { LevelSchemas } from './gameSchemas.types';
import { createInteractionConfigSchema } from './interactions.schema';

export const createLevelObjectsSchema = (schemas: LevelSchemas): z.ZodType<LevelObjects> => {
  const { decorationKeys, itemKeys, levelsIds } = schemas;
  const decorationKeysSchema = z.enum(decorationKeys);
  const itemKeysSchema = z.enum(itemKeys);
  const levelsIdsSchema = z.enum(levelsIds);

  const interactionConfigSchema = createInteractionConfigSchema(itemKeysSchema);

  const NpcBehaviorSchema = z.discriminatedUnion('type', [
    z.object({ type: z.literal('walk'), direction: z.enum(DIRECTIONS), speed: z.number().optional() }).strict(),
    z.object({ type: z.literal('stand'), direction: z.enum(DIRECTIONS), duration: z.number().optional() }).strict(),
  ]) satisfies z.ZodType<NpcBehavior>;

  return z.union([
    z
      .object({
        type: z.literal('CollectibleItem'),
        id: z.string(),
        itemKey: itemKeysSchema,
        x: z.number().int(),
        y: z.number().int(),
        behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
        skipCollectAnimation: z.boolean().optional(),
      })
      .strict(),
    z
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
      .strict(),
    z
      .object({
        type: z.literal('Exit'),
        id: z.string(),
        newLevelId: levelsIdsSchema,
        x: z.number().int(),
        y: z.number().int(),
        behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
        newHeroPosition: Coords2DSchema,
      })
      .strict(),
    z
      .object({
        type: z.literal('Chest'),
        id: z.string(),
        x: z.number().int(),
        y: z.number().int(),
        behaviorConfig: z.array(MovableObjectBehaviorSchema).optional(),
        status: z.enum(CHEST_STATUSES).optional(),
        removeAfterLoot: z.boolean().optional(),
        interactionConfig: interactionConfigSchema,
      })
      .strict(),
    z
      .object({
        type: z.literal('Npc'),
        id: z.string(),
        x: z.number().int(),
        y: z.number().int(),
        behaviorConfig: z.array(NpcBehaviorSchema).optional(),
        npc: z.string(),
        facingDirection: z.enum(DIRECTIONS).optional(),
        interactionConfig: interactionConfigSchema,
      })
      .strict(),
  ]) satisfies z.ZodType<LevelObjects>;
};
