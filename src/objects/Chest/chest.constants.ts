import type { Registry } from '../../types/registry';
import type { ChestStatus } from './chest.types';

// TODO: move this registry to assets json file and load it dynamically, so that we can change the arrow indicator sprite without changing the code. Validate its schema with GameLoader schema validation
export const CHEST_STATUS_FRAME_MAP: Registry<ChestStatus> = {
  closed: 0,
  open: 1,
};
