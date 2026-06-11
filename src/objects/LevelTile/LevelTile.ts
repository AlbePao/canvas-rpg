import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../Sprite';
import type { LevelTileConfig, LevelTileHeroBehavior } from './levelTile.types';
import { getLevelTileFrame, getWaterAnimations } from './levelTile.utils';

export class LevelTile extends GameObject {
  readonly body: Sprite;
  readonly heroBehavior?: LevelTileHeroBehavior;

  constructor(config: LevelTileConfig) {
    const { id, tileName, position, heroBehavior } = config;

    super({
      id,
    });

    this.body = new Sprite({
      id,
      resource: Resources.images.tileset,
      hFrames: 52,
      vFrames: 25,
      frame: getLevelTileFrame(tileName),
      position,
      animations: getWaterAnimations(tileName),
    });
    this.addChild(this.body);

    this.heroBehavior = heroBehavior;
  }
}
