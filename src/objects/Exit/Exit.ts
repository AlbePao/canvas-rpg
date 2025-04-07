import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';

export class Exit extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    this.addChild(
      new Sprite({
        resource: resources.images.exit,
      }),
    );

    this.drawLayer = 'FLOOR';
  }

  ready() {
    events.on<Vector2>('HERO_POSITION', this, (position) => {
      // detect overlap
      const roundedHeroX = Math.round(position.x);
      const roundedHeroY = Math.round(position.y);

      if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
        events.emit('HERO_EXITS');
      }
    });
  }
}
