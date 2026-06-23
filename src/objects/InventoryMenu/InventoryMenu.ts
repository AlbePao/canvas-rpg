import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { BoxBackdrop } from '../BoxBackdrop';
import type { Main } from '../Main';
import { PAUSE_SUB_MENU_CLOSE } from '../PauseMenu';

export class InventoryMenu extends GameObject {
  private readonly _backdrop = new BoxBackdrop({
    id: `${this.id}-inventory-box-backdrop`,
    width: 4,
    height: 4,
  });

  constructor() {
    // The x and y position are related to PauseMenu position
    super({
      id: 'inventory-box',
      x: 6,
      y: 0,
    });

    // Draw on top layer
    this.drawLayer = 'HUD';
  }

  override step(_delta: number, root: Main): void {
    const { input } = root;

    // Close inventory menu if user presses esc while it's open
    if (input.getActionJustPressed('ArrowLeft') || input.getActionJustPressed('KeyA')) {
      Events.emit(PAUSE_SUB_MENU_CLOSE);
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this._backdrop.drawImage(ctx, drawPosX, drawPosY);
  }
}
