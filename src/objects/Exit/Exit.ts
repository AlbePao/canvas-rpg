import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { detectOverlap } from '../../helpers/detectOverlap';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { ExitConfig } from './exit.types';

export class Exit extends GameObject {
  constructor({ id, x, y }: ExitConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    this.addChild(
      new Sprite({
        id: `${id}-exit-sprite`,
        resource: resources.images.exit,
      }),
    );

    this.drawLayer = 'FLOOR';
  }

  ready() {
    events.on<Vector2>('HERO_POSITION', this, (position) => {
      if (detectOverlap(position, this.position)) {
        events.emit('HERO_EXITS');
      }
    });
  }
}
