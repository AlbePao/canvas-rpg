import { HERO_POSITION } from '../../constants/events';
import { detectOverlap } from '../../helpers/detectOverlap';
import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { GameObject } from '../../lib/GameObject';
import type { LevelTileName, LevelWaterTileName, LevelWaterTileSet } from '../../lib/LevelBuilder/tileset.types';
import { TILESET_FRAME_MAP } from '../../lib/LevelBuilder/tilesetFrameMap';
import { Resources } from '../../lib/Resources';
import type { Vector2 } from '../../lib/Vector2';
import { Hero } from '../Hero';
import { Sprite } from '../Sprite';
import type { LevelTileConfig } from './levelTile.types';
import { WATER_ANIMATIONS } from './levelTileAnimations';

function isWaterTile(tileName: LevelTileName): tileName is LevelWaterTileName {
  return tileName.includes('water');
}

function getLevelTileFrame(tileName: LevelTileName): number {
  if (isWaterTile(tileName)) {
    const waterTileName = tileName.replace(/(water)/, 'water1').replace(/(Water)/, 'Water1') as LevelWaterTileSet;

    return TILESET_FRAME_MAP[waterTileName];
  }

  return TILESET_FRAME_MAP[tileName];
}

function getWaterAnimations(tileName: LevelTileName): Animations | undefined {
  if (isWaterTile(tileName)) {
    return new Animations(WATER_ANIMATIONS[tileName]);
  }

  return undefined;
}

export class LevelTile extends GameObject {
  body: Sprite;
  behavior: LevelTileConfig['behavior'] | null = null;

  constructor(config: LevelTileConfig) {
    const { id, tileName, position, behavior } = config;

    super({
      id,
    });

    this.body = new Sprite({
      id,
      resource: Resources.images.tileset,
      hFrames: 52,
      vFrames: 25,
      frame: getLevelTileFrame(tileName),
      position,
      animations: getWaterAnimations(tileName),
    });
    this.addChild(this.body);

    this.behavior = behavior ?? null;
  }

  override ready(): void {
    if (!this.behavior) {
      return;
    }

    Events.on<Vector2>(HERO_POSITION, this, (position) => {
      if (detectOverlap(position, this.position)) {
        const hero = this.parent?.children.find((child) => child instanceof Hero);
        if (hero && this.behavior) {
          // const { heroBehavior, moveDirection } = this.behavior;
          // if (heroBehavior === 'jump') {
          //   // hero.jump(moveDirection);
          // } else if (heroBehavior === 'move') {
          //   // hero.move(moveDirection);
          // } else if (heroBehavior === 'spin') {
          //   // hero.spin(moveDirection);
          // }
        }
      }
    });
  }
}
