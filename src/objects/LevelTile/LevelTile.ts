import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Sprite } from '../Sprite';
import type { LevelTileConfig } from './levelTile.types';

// TODO: implement hero behavior when is stepping on the tile
export class LevelTile extends GameObject {
  constructor(config: LevelTileConfig) {
    const { id, tileName, position } = config;

    super({
      id,
    });

    const { assets, tiles } = GameRegistry;
    const { hFrames, vFrames, frameSize, resource } = assets.get('tileset');

    const body = new Sprite({
      id,
      resource,
      frameSize,
      hFrames,
      vFrames,
      frame: tiles.get(tileName),
      position,
      animations: this.createAnimations('tiles', tileName),
    });
    this.addChild(body);
  }
}
