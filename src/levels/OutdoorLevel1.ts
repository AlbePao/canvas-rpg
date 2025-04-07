import { events } from '../Events';
import { gridCells } from '../helpers/grid';
import { Exit } from '../objects/Exit/Exit';
import { Hero } from '../objects/Hero/Hero';
import { Level, LevelConfig } from '../objects/Level/Level';
import { Rod } from '../objects/Rod/Rod';
import { resources } from '../Resource';
import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';
import { CaveLevel1 } from './CaveLevel1';

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class OutdoorLevel1 extends Level {
  background = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180),
  });

  constructor(config?: LevelConfig) {
    super();

    const groundSprite = new Sprite({
      resource: resources.images.ground,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const exit = new Exit(gridCells(6), gridCells(3));
    this.addChild(exit);

    this.heroStartPosition = config?.heroPosition ?? DEFAULT_HERO_POSITION;
    const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
    this.addChild(hero);

    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);

    this.walls.add('64,48'); // Tree

    this.walls.add('64,64'); // Square
    this.walls.add('64,80');
    this.walls.add('80,64');
    this.walls.add('80,80');

    this.walls.add('112,80'); // Water
    this.walls.add('128,80');
    this.walls.add('144,80');
    this.walls.add('160,80');
  }

  ready(): void {
    events.on('HERO_EXITS', this, () => {
      events.emit(
        'CHANGE_LEVEL',
        new CaveLevel1({
          heroPosition: new Vector2(gridCells(3), gridCells(6)),
        }),
      );
    });
  }
}
