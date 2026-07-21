import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Sprite } from '../Sprite';
import type { LevelTileConfig, LevelTileHeroBehavior } from './levelTile.types';

export class LevelTile extends GameObject {
  readonly body: Sprite;
  readonly heroBehavior?: LevelTileHeroBehavior;

  constructor(config: LevelTileConfig) {
    const { id, tileName, position, heroBehavior } = config;

    super({
      id,
    });

    const { hFrames, vFrames, frameSize, resource } = GameRegistry.getAssetData('tileset');

    this.body = new Sprite({
      id,
      resource,
      frameSize,
      hFrames,
      vFrames,
      frame: GameRegistry.getTileFrame(tileName),
      position,
      animations: this.createAnimations('tiles', tileName),
    });
    this.addChild(this.body);

    this.heroBehavior = heroBehavior;
  }
}
