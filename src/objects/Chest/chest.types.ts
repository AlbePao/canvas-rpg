import type { InteractiveObjectConfig } from '../InteractiveObject';

export type ChestStatus = 'OPEN' | 'CLOSED';

export type ChestConfig = InteractiveObjectConfig & {
  status?: ChestStatus;
  removeAfterLoot?: boolean;
};
