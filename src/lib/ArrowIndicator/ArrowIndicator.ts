import { Sprite } from '../../objects/Sprite';
import type { Directions } from '../../types/directions';
import { GameObject } from '../GameObject';
import { Resources } from '../Resources';
import { Vector2 } from '../Vector2';
import type { ArrowIndicatorConfig } from './arrowIndicator.types';

const ARROW_DIRECTION_TO_FRAME: Record<Directions, number> = {
  RIGHT: 0,
  LEFT: 1,
  DOWN: 2,
  UP: 3,
};

export class ArrowIndicator extends GameObject {
  body: Sprite;

  constructor(config: ArrowIndicatorConfig) {
    super(config);

    const { direction } = config;

    this.body = new Sprite({
      id: `${this.id}-arrow-indicator`,
      resource: Resources.images.arrows,
      frameSize: new Vector2(11, 11),
      hFrames: 4,
      vFrames: 1,
      frame: ARROW_DIRECTION_TO_FRAME[direction],
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    this.body.draw(ctx, x, y);
  }
}
