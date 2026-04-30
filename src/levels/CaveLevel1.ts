import { events } from '../Events';
import { gridCells } from '../helpers/grid';
import { Chest } from '../objects/Chest/Chest';
import { CollectibleItem } from '../objects/CollectibleItem/CollectibleItem';
import { Exit } from '../objects/Exit/Exit';
import { Level, LevelConfig } from '../objects/Level/Level';
import { Npc } from '../objects/Npc/Npc';
import { resources } from '../Resource';
import { Sprite } from '../Sprite';
import { TALKED_TO_A, TALKED_TO_B } from '../StoryFlags';
import { Vector2 } from '../Vector2';
import { OutdoorLevel1 } from './OutdoorLevel1';

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class CaveLevel1 extends Level {
  background = new Sprite({
    resource: resources.images.cave,
    frameSize: new Vector2(320, 180),
  });

  constructor(config?: LevelConfig) {
    super({
      heroPosition: config?.heroPosition ?? DEFAULT_HERO_POSITION,
    });

    const groundSprite = new Sprite({
      resource: resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    const heart = new CollectibleItem({
      item: 'heart',
      x: gridCells(10),
      y: gridCells(3),
      shouldSkipPickupAnimation: true,
    });
    this.addChild(heart);

    const rod = new CollectibleItem({
      item: 'rod2',
      x: gridCells(9),
      y: gridCells(6),
    });
    this.addChild(rod);

    const chest = new Chest({
      x: gridCells(4),
      y: gridCells(3),
      lootData: {
        item: 'sword',
      },
    });
    this.addChild(chest);

    const npc1 = new Npc(gridCells(5), gridCells(5), {
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
          requires: [],
        },
      ],
      portraitFrame: 1,
    });
    this.addChild(npc1);

    const npc2 = new Npc(gridCells(8), gridCells(5), {
      content: [
        {
          string: 'What a beautiful day to work in the cave!',
          requires: [],
          addsFlag: TALKED_TO_B,
        },
      ],
      portraitFrame: 0,
    });
    this.addChild(npc2);
  }

  ready(): void {
    events.on('HERO_EXITS', this, () => {
      events.emit(
        'CHANGE_LEVEL',
        new OutdoorLevel1({
          heroPosition: new Vector2(gridCells(6), gridCells(4)),
        }),
      );
    });
  }
}
