import { GameRegistry } from '../../lib/GameRegistry';
import type { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';

export function createItemSprite(id: string, frame: number, position: Vector2): Sprite {
  const { hFrames, vFrames, frameSize, resource } = GameRegistry.getAssetData('items');

  return new Sprite({
    id,
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    position,
  });
}
