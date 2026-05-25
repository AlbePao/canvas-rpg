import type { GameObjectConfig, GameObjectDrawLayer } from '../../lib/GameObject';
import type { LevelDecorationTileset } from '../../lib/LevelBuilder/tileset.types';

export type DecorationConfig = GameObjectConfig & {
  key: LevelDecorationTileset;
  isSolid?: boolean;
  drawLayer?: GameObjectDrawLayer;
};
