import type { GameObjectConfig, GameObjectDrawLayer } from '../../lib/GameObject';
import type { LevelDecorationTileset } from '../../lib/Tileset';

export type DecorationConfig = GameObjectConfig & {
  key: LevelDecorationTileset;
  isSolid?: boolean;
  drawLayer?: GameObjectDrawLayer;
};
