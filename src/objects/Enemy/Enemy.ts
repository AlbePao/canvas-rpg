import { Animations } from '../../Animations';
import { FrameIndexPattern } from '../../FrameIndexPattern';
import { GameObject } from '../../GameObject';
import { Resources } from '../../Resources';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { Level } from '../Level';
import { EnemyAnimationFrame, EnemyConfig } from './enemy.types';
import { HIT_1, HIT_2, HOVER_1, HOVER_2, HOVER_3, HOVER_4 } from './enemyAnimations';

export class Enemy extends GameObject {
  health: number;
  body: Sprite;
  isSolid = true;

  constructor({ id, x, y, health }: EnemyConfig) {
    super({
      id,
      position: new Vector2(x, y),
    });

    this.health = health ?? 100;

    // Shadow under feet
    const shadow = new Sprite({
      id: `${id}-enemy-shadow-sprite`,
      resource: Resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    // Body sprite
    this.body = new Sprite({
      id: `${id}-enemy-body-sprite`,
      resource: Resources.images.bat,
      frameSize: new Vector2(32, 32),
      hFrames: 6,
      vFrames: 1,
      position: new Vector2(-8, -18),
      animations: new Animations<EnemyAnimationFrame>({
        hover1: new FrameIndexPattern(HOVER_1),
        hover2: new FrameIndexPattern(HOVER_2),
        hover3: new FrameIndexPattern(HOVER_3),
        hover4: new FrameIndexPattern(HOVER_4),
        hit1: new FrameIndexPattern(HIT_1),
        hit2: new FrameIndexPattern(HIT_2),
      }),
    });
    this.addChild(this.body);
  }

  ready(): void {}

  step(_delta: number, _root: Level): void {
    // TODO: move in level according to pattern set in config
    // TODO: if shouldChaseHero and hero is within range, move towards hero, go to start position if hero runs outside range
    // TODO: detect if colliding with hero and emit event to damage him
    // TODO: detect if colliding with hero attack and reduce health / play hit animation
  }
}
