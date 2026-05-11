import { HERO_EXITS, HERO_POSITION } from '../../constants/events';
import { detectOverlap } from '../../helpers/detectOverlap';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { Vector2 } from '../../lib/Vector2';
import type { ExitConfig, ExitData } from './exit.types';

// TODO: add customizable exit sprite
export class Exit extends GameObject {
  readonly exitData: ExitData;

  constructor({ id, x, y }: ExitConfig) {
    const exitData = {
      id,
      position: new Vector2(x, y),
    };

    super(exitData);
    this.exitData = exitData;

    const exit = new Sprite({
      id: `${id}-exit-sprite`,
      resource: Resources.images.exit,
    });
    this.addChild(exit);

    this.drawLayer = 'FLOOR';
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        Events.emit<ExitData>(HERO_EXITS, this.exitData);
      }
    });
  }
}
