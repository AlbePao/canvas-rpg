import { HERO_EXITS, HERO_POSITION } from '../../constants/events';
import { Events } from '../../Events';
import { GameObject } from '../../GameObject';
import { detectOverlap } from '../../helpers/detectOverlap';
import { Resources } from '../../Resources';
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
        resource: Resources.images.exit,
      }),
    );

    this.drawLayer = 'FLOOR';
  }

  ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        // TODO: add a timeout and a  flash animation before entering the new level
        Events.emit(HERO_EXITS);
      }
    });
  }
}
