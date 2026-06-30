import type { InteractiveObjectConfig } from '../InteractiveObject';

export const CHEST_STATUSES = ['OPEN', 'CLOSED'] as const;
export type ChestStatus = (typeof CHEST_STATUSES)[number];

export type ChestConfig = InteractiveObjectConfig & {
  status?: ChestStatus;
  removeAfterLoot?: boolean;
};
