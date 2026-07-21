import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
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

    const { hFrames, vFrames, frameSize, position, resource } = GameRegistry.getAssetData('arrows');

    this._body = new Sprite({
      id: `${this.id}-arrow-indicator`,
      resource,
      frameSize,
      hFrames,
      vFrames,
      frame: ARROW_DIRECTION_TO_FRAME[direction],
      position,
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    this._body.draw(ctx, drawPosX, drawPosY);
  }
}
