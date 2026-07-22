import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Sprite } from '../Sprite';
import { ARROW_DIRECTION_FRAME_MAP } from './arrowIndicator.constants';
import type { ArrowIndicatorConfig } from './arrowIndicator.types';

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
      frame: ARROW_DIRECTION_FRAME_MAP[direction],
      position,
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    this._body.draw(ctx, drawPosX, drawPosY);
  }
}
