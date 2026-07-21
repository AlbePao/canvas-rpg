import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import type { Vector2 } from '../../lib/Vector2';
import { HERO_EXITS, HERO_POSITION, isHeroOverlapping } from '../Hero';
import { Sprite } from '../Sprite';
import type { ExitConfig, ExitData } from './exit.types';

export class Exit extends GameObject {
  readonly exitData: ExitData;

  constructor(config: ExitConfig) {
    super(config);

    const { id, newHeroPosition, newLevelId } = config;

    const { hFrames, vFrames, frameSize, position, resource } = GameRegistry.getAssetData('exit');

    const exit = new Sprite({
      id: `${id}-exit-sprite`,
      resource,
      frameSize,
      hFrames,
      vFrames,
      position,
    });
    this.addChild(exit);

    this.drawLayer = 'FLOOR';

    this.exitData = {
      id,
      position: this.position,
      newLevelId,
      newHeroPosition,
    };
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (isHeroOverlapping(position, this.position)) {
        Events.emit<ExitData>(HERO_EXITS, this.exitData);
      }
    });
  }
}
