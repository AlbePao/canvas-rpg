import { events } from './Events';
import { GameObject } from './GameObject';
import { Level } from './objects/Level/Level';
import { Vector2 } from './Vector2';

export class Camera extends GameObject {
  constructor() {
    super({});
    events.on<Vector2>('HERO_POSITION', this, (heroPosition) => {
      this.centerPositionOnTarget(heroPosition);
    });

    events.on<Level>('CHANGE_LEVEL', this, (newMap) => {
      this.centerPositionOnTarget(newMap.heroStartPosition!);
    });
  }

  centerPositionOnTarget(position: Vector2) {
    // Create a new position based on the incoming position
    const personHalf = 8;
    const canvasWidth = 320;
    const canvasHeight = 180;
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;
    this.position = new Vector2(-position.x + halfWidth, -position.y + halfHeight);
  }
}
