import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { Vector2 } from '../../lib/Vector2';
import type { InteractiveObject } from '../InteractiveObject';
import { Sprite } from '../Sprite';
import { BATTLE_END } from './battle.constants';
import type { BattleConfig } from './battle.types';

export class Battle extends GameObject {
  background: Sprite;
  starter?: InteractiveObject;

  constructor(config: BattleConfig, starter?: InteractiveObject) {
    super({
      id: 'battle',
    });

    const { background } = config;
    const { canvasWidth, canvasHeight } = Game.containerSizes;
    const { hFrames, vFrames, frameSize, position, resource } = GameRegistry.getAssetData(background);

    this.drawLayer = 'HUD';

    this.background = new Sprite({
      id: 'battle-background',
      resource,
      frameSize: frameSize ?? new Vector2(canvasWidth, canvasHeight),
      hFrames,
      vFrames,
      position,
    });

    this.starter = starter;
  }

  override step(): void {
    const {
      input: { getActionJustPressed },
    } = Game;

    if (getActionJustPressed('KeyQ')) {
      this.destroy();
      Events.emit(BATTLE_END);
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    this.background.draw(ctx, drawPosX, drawPosY);
  }
}
