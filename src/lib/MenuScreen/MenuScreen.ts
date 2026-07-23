import { ArrowIndicator } from '../../objects/ArrowIndicator';
import { BoxBackdrop } from '../../objects/BoxBackdrop';
import { Game } from '../Game';
import { GameObject } from '../GameObject';
import type { MenuScreenConfig } from './menuScreen.types';

export class MenuScreen extends GameObject {
  protected readonly backdrop = new BoxBackdrop({
    id: `${this.id}-inventory-screen-backdrop`,
    width: Game.containerSizes.canvasWidth,
    height: Game.containerSizes.canvasHeight,
  });
  protected readonly indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'RIGHT',
  });

  constructor(config: MenuScreenConfig) {
    const { id } = config;

    super({
      id: `${id}-menu-screen`,
    });

    this.drawLayer = 'HUD';
  }
}
