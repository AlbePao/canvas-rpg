import { CHANGE_LEVEL, HERO_EXITS } from '../constants/events';
import { gridCells } from '../helpers/grid';
import { Events } from '../lib/Events';
import { Resources } from '../lib/Resources';
import { Sprite } from '../lib/Sprite';
import { Vector2 } from '../lib/Vector2';
import { Exit } from '../objects/Exit';
import { Hero } from '../objects/Hero';
import { CollectibleItem } from '../objects/Item';
import { Level, LevelConfig } from '../objects/Level';
import { Coords } from '../types/coords';
import { CaveLevel1 } from './CaveLevel1';

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));
const LEVEL_ID = 'outdoorLevel1';
const LEVEL_WALLS = [
  //Tree
  '64,48',
  // Square
  '64,64',
  '64,80',
  '80,64',
  '80,80',
  // Water
  '112,80',
  '128,80',
  '144,80',
  '160,80',
] satisfies Coords[];

export class OutdoorLevel1 extends Level {
  constructor(config?: LevelConfig) {
    super({
      id: `${LEVEL_ID}-level`,
    });

    this.background = new Sprite({
      id: `${LEVEL_ID}-background-sprite`,
      resource: Resources.images.sky,
      frameSize: new Vector2(320, 180),
    });

    const groundSprite = new Sprite({
      id: `${LEVEL_ID}-ground-sprite`,
      resource: Resources.images.ground,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const exit = new Exit({
      id: `${LEVEL_ID}-exit`,
      x: gridCells(6),
      y: gridCells(3),
    });
    this.addChild(exit);

    this.heroStartPosition = config?.heroPosition ?? DEFAULT_HERO_POSITION;
    const hero = new Hero({
      id: `${LEVEL_ID}-hero`,
      x: this.heroStartPosition.x,
      y: this.heroStartPosition.y,
    });
    this.addChild(hero);

    const hammer = new CollectibleItem({
      id: `${LEVEL_ID}-hammer`,
      item: 'hammer1',
      x: gridCells(7),
      y: gridCells(6),
    });
    this.addChild(hammer);

    LEVEL_WALLS.forEach((wallCoords) => this.walls.add(wallCoords));
  }

  override ready(): void {
    Events.on(HERO_EXITS, this, () => {
      Events.emit(
        CHANGE_LEVEL,
        new CaveLevel1({
          heroPosition: new Vector2(gridCells(3), gridCells(6)),
        }),
      );
    });
  }
}
