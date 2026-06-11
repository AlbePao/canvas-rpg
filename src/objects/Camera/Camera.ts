import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import type { Vector2 } from '../../lib/Vector2';
import { HERO_POSITION } from '../Hero';
import { CHANGE_LEVEL, type Level } from '../Level';

export class Camera extends GameObject {
  constructor() {
    super({
      id: 'camera',
    });

    Events.on<Vector2>(HERO_POSITION, this, (heroPosition) => {
      this._centerPositionOnTarget(heroPosition);
    });

    Events.on<Level>(CHANGE_LEVEL, this, ({ heroStartPosition }) => {
      if (heroStartPosition) {
        this._centerPositionOnTarget(heroStartPosition);
      }
    });
  }

  private _centerPositionOnTarget(position: Vector2): void {
    // Create a new position based on the incoming position
    const personHalf = 8;
    const { canvasWidth, canvasHeight } = Game.getContainerSizes();
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;
    // Reuse existing Vector2, just update x/y
    this.position.x = -position.x + halfWidth;
    this.position.y = -position.y + halfHeight;
  }
}
