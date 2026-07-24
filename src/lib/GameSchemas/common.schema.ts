import { z } from 'zod';
import type { GridCoords } from '../../objects/Level';
import type { MovableObjectBehavior } from '../../objects/MovableObject';
import { DIRECTIONS } from '../../types/directions';
import type { Coords2D } from '../Vector2';

export const LevelsIdsSchema = z.array(z.string()) satisfies z.ZodType<string[]>;

export const Coords2DSchema = z
  .object({
    x: z.number().int(),
    y: z.number().int(),
  })
  .strict() satisfies z.ZodType<Coords2D>;

export const WallCoordSchema = z.templateLiteral([
  z.number().int(),
  z.literal(','),
  z.number().int(),
]) satisfies z.ZodType<GridCoords>;

export const MovableObjectBehaviorSchema = z
  .object({
    type: z.unknown(),
    direction: z.enum(DIRECTIONS),
  })
  .strict() satisfies z.ZodType<MovableObjectBehavior>;
