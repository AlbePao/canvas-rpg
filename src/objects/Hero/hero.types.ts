import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

const ANIMATION_FRAMES = [
  'walkDown',
  'walkUp',
  'walkLeft',
  'walkRight',
  'standDown',
  'standUp',
  'standLeft',
  'standRight',
  'pickUpDown',
] as const;

export type HeroAnimationFrame = (typeof ANIMATION_FRAMES)[number];

export type HeroConfig = GameObjectBaseConfig;
