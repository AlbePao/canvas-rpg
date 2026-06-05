import { PAUSE_OFF } from '../../constants/events';
import { Events } from '../../lib/Events';
import { Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { BackdropBox } from '../BackdropBox';
import { Sprite } from '../Sprite';
import { getCharacterFrame, getCharacterWidth } from '../SpriteTextBox';

export class PauseMenu extends GameObject {
  readonly backdrop = new BackdropBox({
    id: `${this.id}-text-box-backdrop`,
    width: 4,
    height: 4,
  });

  constructor() {
    super({
      id: 'pauseMenu',
      x: Game.pauseMenuWidth,
      y: Game.pauseMenuHeight,
    });

    // Draw on top layer
    this.drawLayer = 'HUD';
  }

  override ready(): void {
    const endingSub = Events.on(PAUSE_OFF, this, () => {
      this.destroy();
      Events.off(endingSub);
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the text
    let startIndex = drawPosX + 6;
    'Pause'.split('').forEach((char) => {
      startIndex += getCharacterWidth(char) + 1;
      new Sprite({
        id: `${this.id}-char-${char}`,
        resource: Resources.images.font,
        hFrames: 13,
        vFrames: 6,
        frame: getCharacterFrame(char),
      }).draw(ctx, startIndex, drawPosY + 12);
    });
  }
}
