import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type HeroAnimationFrame =
  | 'walkDown'
  | 'walkUp'
  | 'walkLeft'
  | 'walkRight'
  | 'standDown'
  | 'standUp'
  | 'standLeft'
  | 'standRight'
  | 'pickUpDown';

export type HeroConfig = GameObjectBaseConfig;
