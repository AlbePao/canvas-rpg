import { GRID_SIZE, toGridSize } from '../../lib/Game';
import { Resources } from '../../lib/Resources';
import { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';

export function createItemSprite(id: string, frame: number, position: Vector2): Sprite {
  return new Sprite({
    id,
    resource: Resources.images.items,
    frameSize: new Vector2(GRID_SIZE, toGridSize(2)),
    hFrames: 10,
    vFrames: 1,
    frame,
    position,
  });
}
