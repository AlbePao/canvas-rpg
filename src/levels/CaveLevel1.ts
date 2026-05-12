import { CHANGE_LEVEL, HERO_EXITS } from '../constants/events';
import { TALKED_TO_A, TALKED_TO_B } from '../constants/storyFlags';
import { gridCells } from '../helpers/grid';
import { Events } from '../lib/Events';
import { LevelTransition } from '../lib/LevelTransition';
import { Resources } from '../lib/Resources';
import { Sprite } from '../lib/Sprite';
import { Vector2 } from '../lib/Vector2';
import { Chest } from '../objects/Chest';
import { Enemy } from '../objects/Enemy';
import { Exit } from '../objects/Exit';
import { Hero } from '../objects/Hero';
import { CollectibleItem } from '../objects/Item';
import type { LevelConfig } from '../objects/Level';
import { Level } from '../objects/Level';
import { Npc } from '../objects/Npc';
import { OutdoorLevel1 } from './OutdoorLevel1';

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));
const LEVEL_ID = 'caveLevel1';

export class CaveLevel1 extends Level {
  constructor(config?: LevelConfig) {
    super({
      id: LEVEL_ID,
    });

    this.background = new Sprite({
      id: `${LEVEL_ID}-background-sprite`,
      resource: Resources.images.cave,
      frameSize: new Vector2(320, 180),
    });

    const groundSprite = new Sprite({
      id: `${LEVEL_ID}-ground-sprite`,
      resource: Resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const exit = new Exit({
      id: `${LEVEL_ID}-exit`,
      x: gridCells(3),
      y: gridCells(5),
    });
    this.addChild(exit);

    this.heroStartPosition = config?.heroStartPosition ?? DEFAULT_HERO_POSITION;
    const hero = new Hero({
      id: `${LEVEL_ID}-hero`,
      x: this.heroStartPosition.x,
      y: this.heroStartPosition.y,
    });
    this.addChild(hero);

    const heart = new CollectibleItem({
      id: `${LEVEL_ID}-heart`,
      item: 'heart',
      x: gridCells(10),
      y: gridCells(3),
      shouldSkipPickupAnimation: true,
    });
    this.addChild(heart);

    const rod = new CollectibleItem({
      id: `${LEVEL_ID}-rod`,
      item: 'rod2',
      x: gridCells(9),
      y: gridCells(6),
    });
    this.addChild(rod);

    const chest = new Chest({
      id: `${LEVEL_ID}-chest`,
      x: gridCells(4),
      y: gridCells(3),
      lootConfig: {
        item: 'sword',
      },
    });
    this.addChild(chest);

    const chest2 = new Chest({
      id: `${LEVEL_ID}-chest2`,
      x: gridCells(7),
      y: gridCells(3),
      lootConfig: {
        item: 'hammer1',
      },
      textConfig: [
        {
          string: "You've found an hammer",
        },
      ],
    });
    this.addChild(chest2);

    const bat = new Enemy({
      id: `${LEVEL_ID}-bat`,
      x: gridCells(14),
      y: gridCells(4),
    });
    this.addChild(bat);

    const npc1 = new Npc({
      id: `${LEVEL_ID}-npc1`,
      x: gridCells(5),
      y: gridCells(5),
      textConfig: {
        content: [
          {
            string: "I just can't stand that guy.",
            requires: [TALKED_TO_B],
            bypass: [TALKED_TO_A],
            addsFlag: TALKED_TO_A,
          },
          {
            string: 'He is just the worst!',
            requires: [TALKED_TO_A],
          },
          {
            string: 'Grumble grumble. Another day at work',
          },
        ],
        portraitFrame: 1,
      },
    });
    this.addChild(npc1);

    const npc2 = new Npc({
      id: `${LEVEL_ID}-npc2`,
      x: gridCells(8),
      y: gridCells(5),
      textConfig: {
        content: [
          {
            string: 'What a beautiful day to work in the cave!',
            addsFlag: TALKED_TO_B,
          },
        ],
        portraitFrame: 0,
      },
    });
    this.addChild(npc2);

    const npc3 = new Npc({
      id: `${LEVEL_ID}-npc3`,
      x: gridCells(12),
      y: gridCells(5),
      textConfig: {
        content: [
          {
            string: 'Go away!',
          },
        ],
        portraitFrame: 0,
      },
    });
    this.addChild(npc3);
  }

  override ready(): void {
    Events.on(HERO_EXITS, this, () => {
      LevelTransition.init(() => {
        Events.emit(
          CHANGE_LEVEL,
          new OutdoorLevel1({
            heroStartPosition: new Vector2(gridCells(6), gridCells(4)),
          }),
        );
      });
    });
  }
}
