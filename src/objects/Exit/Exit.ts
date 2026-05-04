import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import { Vector2 } from '../../Vector2';

export type ExitConfig = GameObjectBaseConfig;

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
      // detect overlap
      const roundedHeroX = Math.round(position.x);
      const roundedHeroY = Math.round(position.y);

      if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
        events.emit('HERO_EXITS');
      }
    });
  }
}
