import { Animations } from '../../lib/Animations';
import type {
  LevelTileName,
  LevelWaterAnimatedTileName,
  LevelWaterTileName,
  LevelWaterTileSet,
} from '../../lib/Tileset';
import { TILESET_FRAME_MAP } from '../../lib/Tileset';
import { WATER_ANIMATIONS } from './levelTile.animations';

function isWaterTile(tileName: LevelTileName): tileName is LevelWaterTileName {
  return tileName.toLowerCase().includes('water');
}

function isWaterAnimatedTile(tileName: LevelWaterTileName): tileName is LevelWaterAnimatedTileName {
  return tileName.includes('Animated');
}

export function getLevelTileFrame(tileName: LevelTileName): number {
  if (isWaterTile(tileName)) {
    const waterTileName = tileName.replace(/(water)/, 'water1').replace(/(Water)/, 'Water1') as LevelWaterTileSet;

    return TILESET_FRAME_MAP[waterTileName];
  }

  return TILESET_FRAME_MAP[tileName];
}

export function getWaterAnimations(tileName: LevelTileName): Animations | null {
  if (isWaterTile(tileName) && isWaterAnimatedTile(tileName)) {
    return new Animations(WATER_ANIMATIONS[tileName]);
  }

  return null;
}
