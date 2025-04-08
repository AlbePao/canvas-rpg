import { Camera } from '../../Camera';
import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { Input } from '../../Input';
import { Inventory } from '../Inventory/Inventory';
import { Level } from '../Level/Level';
import { SpriteTextString } from '../SpriteTextString/SpriteTextString';

export class Main extends GameObject {
  level: Level | null = null;
  input = new Input();
  camera = new Camera();

  constructor() {
    super({});
  }

  ready(): void {
    const inventory = new Inventory();
    this.addChild(inventory);

    setTimeout(() => {
      const textBox = new SpriteTextString('Hello! This is the content! This is the content! This is the content!');
      this.addChild(textBox);
    }, 300);

    events.on<Level>('CHANGE_LEVEL', this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });
  }

  setLevel(newLevelInstance: Level) {
    if (this.level) {
      this.level.destroy();
    }

    this.level = newLevelInstance;
    this.addChild(this.level);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level?.background?.drawImage(ctx, 0, 0);
  }

  drawObjects(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer !== 'HUD') {
        child.draw(ctx, 0, 0);
      }
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer === 'HUD') {
        child.draw(ctx, 0, 0);
      }
    });
  }
}
