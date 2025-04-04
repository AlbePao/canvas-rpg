import { events } from '../Events';
import { gridCells } from '../helpers/grid';
import { Exit } from '../objects/Exit/Exit';
import { Hero } from '../objects/Hero/Hero';
import { Level } from '../objects/Level/Level';
import { Rod } from '../objects/Rod/Rod';
import { resources } from '../Resource';
import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';
import { OutdoorLevel1 } from './OutdoorLevel1';

export class CaveLevel1 extends Level {
  background = new Sprite({
    resource: resources.images.cave,
    frameSize: new Vector2(320, 180),
  });

  constructor() {
    super();

    const groundSprite = new Sprite({
      resource: resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    const hero = new Hero(gridCells(6), gridCells(5));
    this.addChild(hero);

    const rod = new Rod(gridCells(9), gridCells(6));
    this.addChild(rod);
  }

  ready(): void {
    events.on('HERO_EXITS', this, () => {
      events.emit('CHANGE_LEVEL', new OutdoorLevel1());
    });
  }
}
