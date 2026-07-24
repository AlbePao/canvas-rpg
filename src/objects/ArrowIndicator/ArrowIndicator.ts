import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Sprite } from '../Sprite';
import type { ArrowIndicatorConfig } from './arrowIndicator.types';

export class ArrowIndicator extends GameObject {
  private readonly _body: Sprite;

  constructor(config: ArrowIndicatorConfig) {
    super(config);

    const { direction } = config;
    const { assets, arrowDirections } = GameRegistry;
    const { hFrames, vFrames, frameSize, position, resource } = assets.get('arrows');

    this._body = new Sprite({
      id: `${this.id}-arrow-indicator`,
      resource,
      frameSize,
      hFrames,
      vFrames,
      frame: arrowDirections.get(direction),
      position,
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    this._body.draw(ctx, drawPosX, drawPosY);
  }
}
