import { z } from 'zod';
import type {
  InteractionBattleConfig,
  InteractionConfig,
  InteractionContentConfig,
} from '../../objects/InteractiveObject';
import type { SelectionOption } from '../../objects/SelectionBox';

export const createInteractionConfigSchema = (itemKeysSchema: z.ZodType<string>): z.ZodType<InteractionConfig> => {
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
        // Branch 1: options only
        z.object({
          options: z.array(SelectionOptionSchema).optional(),
          addsFlag: z.never().optional(),
          itemKey: z.never().optional(),
          battle: z.never().optional(),
        }),
        // Branch 2: flags and items
        z.object({
          options: z.never().optional(),
          addsFlag: z.string().optional(),
          itemKey: itemKeysSchema.optional(),
          battle: z.never().optional(),
        }),
        // Branch 3: battle
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

  return z
    .object({
      portraitFrame: z.number().int().nullable().optional(),
      content: z.array(InteractionContentConfigSchema),
    })
    .strict() satisfies z.ZodType<InteractionConfig>;
};
