import type { Animations } from '../../lib/Animations';
import type { Resource } from '../../lib/Resources';
import type { Vector2 } from '../../lib/Vector2';

export type SpriteConfig = {
  id: string;
  resource: Resource;
} & Partial<{
  frameSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  scale: number;
  position: Vector2;
  animations: Animations | null;
}>;
