import { toGridSize } from '../../lib/Game';
import { GameRegistry } from '../../lib/GameRegistry';
import { Vector2 } from '../../lib/Vector2';
import { Sprite } from '../Sprite';

export function createStartingPosition(id: string, x: number, y: number): Sprite {
  const { assets, tiles } = GameRegistry;
  const { hFrames, vFrames, frameSize, resource } = assets.get('tileset');

  return new Sprite({
    id,
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame: tiles.get('tallGrassBgSnow'),
    position: new Vector2(toGridSize(x), toGridSize(y)),
  });
}
