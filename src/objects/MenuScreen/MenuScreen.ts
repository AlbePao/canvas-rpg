import { fromGridSize, Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import type { MenuScreenConfig } from './menuScreen.types';

export class MenuScreen extends GameObject {
  protected readonly backdrop = new BoxBackdrop({
    id: `${this.id}-inventory-screen-backdrop`,
    width: fromGridSize(Game.containerSizes.canvasWidth),
    height: fromGridSize(Game.containerSizes.canvasHeight),
  });
  protected readonly indicator = new ArrowIndicator({
    id: `${this.id}-arrow-indicator`,
    direction: 'right',
  });

  constructor(config: MenuScreenConfig) {
    const { id } = config;

    super({
      id: `${id}-menu-screen`,
    });

    this.drawLayer = 'hud';
  }
}
