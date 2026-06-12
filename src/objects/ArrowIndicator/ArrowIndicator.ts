import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import { Sprite } from '../Sprite';
import type { ArrowIndicatorConfig } from './arrowIndicator.types';

const ARROW_DIRECTION_TO_FRAME: Record<Directions, number> = {
  RIGHT: 0,
  LEFT: 1,
  DOWN: 2,
  UP: 3,
};

export class ArrowIndicator extends GameObject {
  private readonly _body: Sprite;

  constructor(config: ArrowIndicatorConfig) {
    super(config);

    const { direction } = config;

    this._body = new Sprite({
      id: `${this.id}-arrow-indicator`,
      resource: Resources.images.arrows,
      frameSize: new Vector2(11, 11),
      hFrames: 4,
      vFrames: 1,
      frame: ARROW_DIRECTION_TO_FRAME[direction],
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    this._body.draw(ctx, x, y);
  }
}
