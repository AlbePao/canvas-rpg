import { HERO_PICKS_UP_ITEM, HERO_POSITION } from '../../constants/events';
import { Events } from '../../Events';
import { GameObject } from '../../GameObject';
import { detectOverlap } from '../../helpers/detectOverlap';
import { Resources } from '../../Resources';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { RodConfig, RodData } from './rod.types';

export class Rod extends GameObject {
  constructor({ id, x, y }: RodConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    const sprite = new Sprite({
      id: `${id}-rod-sprite`,
      resource: Resources.images.rod,
      position: new Vector2(0, -5), // nudge upwards visually
    });
    this.addChild(sprite);
  }

  override ready(): void {
    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero(): void {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picker up a rod
    Events.emit<RodData>(HERO_PICKS_UP_ITEM, {
      image: Resources.images.rod,
      position: this.position,
    });
  }
}
