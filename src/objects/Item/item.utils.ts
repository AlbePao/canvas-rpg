import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';

export function createItemSprite(id: string, frame: number, position: Vector2): Sprite {
  return new Sprite({
    id,
    resource: Resources.images.items,
    frameSize: new Vector2(16, 32),
    hFrames: 10,
    vFrames: 1,
    frame,
    position,
  });
}
