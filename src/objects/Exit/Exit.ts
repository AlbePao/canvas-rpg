import { HERO_EXITS, HERO_POSITION } from '../../constants/events';
import { detectOverlap } from '../../helpers/detectOverlap';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { Vector2 } from '../../lib/Vector2';
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
        resource: Resources.images.exit,
      }),
    );

    this.drawLayer = 'FLOOR';
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        // TODO: add a timeout and a flash animation before entering the new level
        Events.emit(HERO_EXITS);
      }
    });
  }
}
