import { Camera } from '../../Camera';
import { events } from '../../Events';
import { GameObject } from '../../GameObject';
import { Input } from '../../Input';
import { Inventory } from '../Inventory/Inventory';
import { Level } from '../Level/Level';

export class Main extends GameObject {
  level: Level | null = null;
  input = new Input();
  camera = new Camera();
  inventory = new Inventory();

  constructor() {
    super({});
  }

  ready(): void {
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

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.inventory.draw(ctx, this.inventory.position.x, this.inventory.position.y);
  }
}
