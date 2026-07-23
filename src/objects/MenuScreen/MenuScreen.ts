import { Events } from '../../lib/Events';
import { fromGridSize, Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { ScreenTransition, type ScreenTransitionConfig } from '../../lib/ScreenTransition';
import { ArrowIndicator } from '../ArrowIndicator';
import { BoxBackdrop } from '../BoxBackdrop';
import { MENU_SCREEN_CLOSE } from './menuScreen.constants';
import type { MenuScreenConfig } from './menuScreen.types';

export class MenuScreen extends GameObject {
  private readonly _closeTransitionConfig?: ScreenTransitionConfig;
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
    const { id, closeTransition } = config;

    super({
      id: `${id}-menu-screen`,
    });

    this.drawLayer = 'hud';

    if (closeTransition) {
      this._closeTransitionConfig = { transition: closeTransition };
    }
  }

  protected close(): void {
    new ScreenTransition(() => {
      Events.emit(MENU_SCREEN_CLOSE);
    }, this._closeTransitionConfig);
  }
}
