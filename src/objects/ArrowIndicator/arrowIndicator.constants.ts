import type { Directions } from '../../types/directions';
import type { Registry } from '../../types/registry';

// TODO: move this registry to assets json file and load it dynamically, so that we can change the arrow indicator sprite without changing the code. Validate its schema with GameLoader schema validation
export const ARROW_DIRECTION_FRAME_MAP: Registry<Directions> = {
  RIGHT: 0,
  LEFT: 1,
  DOWN: 2,
  UP: 3,
};
