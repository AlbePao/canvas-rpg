import { events } from '../Events';
import { gridCells } from '../helpers/grid';
import { CollectibleItem } from '../objects/CollectibleItem/CollectibleItem';
import { Exit } from '../objects/Exit/Exit';
import { Level, LevelConfig } from '../objects/Level/Level';
import { resources } from '../Resource';
import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';
import { CaveLevel1 } from './CaveLevel1';

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));
const LEVEL_ID = 'outdoorLevel1';

export class OutdoorLevel1 extends Level {
  background = new Sprite({
    id: `${LEVEL_ID}-background-sprite`,
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180),
  });

  constructor(config?: LevelConfig) {
    super({
      id: `${LEVEL_ID}-level`,
      heroPosition: config?.heroPosition ?? DEFAULT_HERO_POSITION,
    });

    const groundSprite = new Sprite({
      id: `${LEVEL_ID}-ground-sprite`,
      resource: resources.images.ground,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const exit = new Exit({
      id: `${LEVEL_ID}-exit`,
      x: gridCells(6),
      y: gridCells(3),
    });
    this.addChild(exit);

    const hammer = new CollectibleItem({
      id: `${LEVEL_ID}-hammer`,
      item: 'hammer1',
      x: gridCells(7),
      y: gridCells(6),
    });
    this.addChild(hammer);

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
