import { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type NpcConfig = GameObjectBaseConfig & {
  textConfig: NpcTextConfig;
};

export interface NpcTextConfig {
  portraitFrame: number;
  content: NpcContent[];
}

export interface NpcContent {
  string: string;
  requires: string[];
  bypass?: string[];
  addsFlag?: string;
}

const ANIMATION_FRAMES = ['standing1', 'standing2', 'standing3', 'standing4'] as const;

export type NpcAnimationFrame = (typeof ANIMATION_FRAMES)[number];
