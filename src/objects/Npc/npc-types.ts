import type { GameObjectBaseConfig } from '../../types/gameObjectBaseConfig';

export type NpcConfig = GameObjectBaseConfig & {
  textConfig: NpcTextConfig;
};

export interface NpcTextConfig {
  portraitFrame: number;
  content: NpcContentConfig[];
}

export interface NpcContentConfig {
  string: string;
  requires?: string[];
  bypass?: string[];
  addsFlag?: string;
}

export type NpcContent = {
  portraitFrame: number;
  string: string;
  addsFlag: string | null;
} | null;

export type NpcAnimationFrame = 'standing1' | 'standing2' | 'standing3' | 'standing4';
