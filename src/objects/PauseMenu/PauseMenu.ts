import { END_PAUSE } from '../../constants/events';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { Sprite } from '../../lib/Sprite';
import { Vector2 } from '../../lib/Vector2';
import { getCharacterFrame, getCharacterWidth } from '../SpriteTextBox';

export class PauseMenu extends GameObject {
  backdrop = new Sprite({
    id: `${this.id}-text-box-backdrop`,
    resource: Resources.images.textBox,
    frameSize: new Vector2(256, 64),
  });

  constructor() {
    super({ id: 'pauseMenu', x: 2, y: 3 });

    // Draw on top layer
    this.drawLayer = 'HUD';
  }

  override ready(): void {
    const endingSub = Events.on(END_PAUSE, this, () => {
      this.destroy();
      Events.off(endingSub);
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    // Draw the backdrop
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Draw the text
    let startIndex = drawPosX + 5;
    'Pause'.split('').forEach((letter) => {
      startIndex += getCharacterWidth(letter) + 2;
      new Sprite({
        id: `char-${0}`,
        resource: Resources.images.fontWhite,
        hFrames: 13,
        vFrames: 6,
        frame: getCharacterFrame(letter),
      }).draw(ctx, startIndex, drawPosY + 12);
    });
  }
}
