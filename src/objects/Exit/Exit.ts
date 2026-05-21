import { HERO_EXITS, HERO_POSITION } from '../../constants/events';
import { detectOverlap } from '../../helpers/detectOverlap';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import type { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';
import type { ExitConfig, ExitData } from './exit.types';

export class Exit extends GameObject {
  constructor(config: ExitConfig) {
    super(config);

    const exit = new Sprite({
      id: `${config.id}-exit-sprite`,
      resource: Resources.images.exit,
    });
    this.addChild(exit);

    this.drawLayer = 'FLOOR';
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        Events.emit<ExitData>(HERO_EXITS, {
          id: this.id,
          position: this.position,
        });
      }
    });
  }
}
