import type { FrameIndexPattern } from '../FrameIndexPattern';
import type { LevelWaterTileSet } from '../LevelBuilder/tileset.types';

export type AnimationPattern = Partial<Record<AnimationFrame, FrameIndexPattern>>;

export type AnimationFrame =
  | 'standDown'
  | 'standLeft'
  | 'standRight'
  | 'standUp'
  | 'walkDown'
  | 'walkLeft'
  | 'walkRight'
  | 'walkUp'
  | 'pickUpDown'
  | LevelWaterTileSet;
