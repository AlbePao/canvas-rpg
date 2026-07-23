import type { z } from 'zod';

export interface LevelSchemas {
  decorationKeys: string[];
  itemKeys: string[];
  levelsIds: string[];
  tileKeys: string[];
}

export interface LevelLoadResult {
  id: string;
  success: boolean;
  error?: string;
}

export interface SchemaWithKeys<T> {
  schema: z.ZodType<T>;
  keys: string[];
}
