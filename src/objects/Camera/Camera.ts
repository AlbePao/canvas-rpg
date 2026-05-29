import { CHANGE_LEVEL, HERO_POSITION } from '../../constants/events';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Vector2 } from '../../lib/Vector2';
import type { Level } from '../Level';

export class Camera extends GameObject {
  constructor() {
    super({ id: 'camera' });
    Events.on<Vector2>(HERO_POSITION, this, (heroPosition) => {
      this.centerPositionOnTarget(heroPosition);
    });

    Events.on<Level>(CHANGE_LEVEL, this, ({ heroStartPosition }) => {
      if (heroStartPosition) {
        this.centerPositionOnTarget(heroStartPosition);
      }
    });
  }

  centerPositionOnTarget(position: Vector2): void {
    // Create a new position based on the incoming position
    const personHalf = 8;
    const { canvasWidth, canvasHeight } = Game.getContainerSizes();
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;
    this.position = new Vector2(-position.x + halfWidth, -position.y + halfHeight);
  }
}
