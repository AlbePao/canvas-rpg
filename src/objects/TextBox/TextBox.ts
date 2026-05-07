import { GameObject } from '../../GameObject';
import { Resources } from '../../Resources';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';

export class TextBox extends GameObject {
  content = 'Hi. How are you How are you How are you How are you How are you How are you?';
  backdrop = new Sprite({
    id: `${this.id}-backdrop`,
    resource: Resources.images.textBox,
    frameSize: new Vector2(256, 64),
  });

  constructor() {
    super({
      id: 'text-box',
      position: new Vector2(32, 112),
    });
  }

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Draw backdrop first
    this.backdrop.drawImage(ctx, x, y);

    // Now we draw text
    ctx.font = '12px fontRetroGaming';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#FFFFFF';

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 12;

    const words = this.content.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      // If the test line exceeds the medium width, and it's not the first word...
      if (testWidth > MAX_WIDTH && n > 0) {
        ctx.fillText(line, x + PADDING_LEFT, y + PADDING_TOP);
        // Reset the line to start with the current word
        line = words[n] + ' ';
        // Move our cursor downwards
        y += LINE_HEIGHT;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(this.content, x + PADDING_LEFT, y + PADDING_TOP);
  }
}
