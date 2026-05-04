import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { Resource, resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';
import { Vector2 } from '../../Vector2';

export type RodConfig = GameObjectBaseConfig;

export interface RodData {
  image: Resource;
  position: Vector2;
}

export class Rod extends GameObject {
  constructor({ id, x, y }: RodConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    const sprite = new Sprite({
      id: `${id}-rod-sprite`,
      resource: resources.images.rod,
      position: new Vector2(0, -5), // nudge upwards visually
    });
    this.addChild(sprite);
  }

  ready() {
    events.on<Vector2>('HERO_POSITION', this, (position) => {
      // detect overlap
      const roundedHeroX = Math.round(position.x);
      const roundedHeroY = Math.round(position.y);

      if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picker up a rod
    events.emit<RodData>('HERO_PICKS_UP_ITEM', {
      image: resources.images.rod,
      position: this.position,
    });
  }
}
