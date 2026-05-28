import { HERO_POSITION } from '../../constants/events';
import { detectOverlap } from '../../helpers/detectOverlap';
import { getHeroSiblingObject } from '../../helpers/getHeroSiblingObject';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import type { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';
import type { LevelTileConfig, LevelTileHeroBehavior } from './levelTile.types';
import { getLevelTileFrame, getWaterAnimations } from './levelTile.utils';

export class LevelTile extends GameObject {
  body: Sprite;
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

  override ready(): void {
    if (!this.heroBehavior) {
      return;
    }

    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        const hero = getHeroSiblingObject(this.parent);
        if (hero && this.heroBehavior) {
          // const { heroBehavior, moveDirection } = this.behavior;
          // if (heroBehavior === 'jump') {
          //   // hero.jump(moveDirection);
          // } else if (heroBehavior === 'move') {
          //   // hero.move(moveDirection);
          // } else if (heroBehavior === 'spin') {
          //   // hero.spin(moveDirection);
          // }
        }
      }
    });
  }
}
