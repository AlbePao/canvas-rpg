import { Resources } from '../lib/Resources';
import { Sprite } from '../lib/Sprite';
import { Vector2 } from '../lib/Vector2';

interface ItemSpriteConfig {
  id: string;
  frame: number;
  position: Vector2;
}

export function createItemSprite({ id, frame, position }: ItemSpriteConfig): Sprite {
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
