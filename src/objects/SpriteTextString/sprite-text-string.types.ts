import { Sprite } from '../../Sprite';

export type Word = {
  wordWidth: number;
  chars: Char[];
};

export type Char = {
  width: number;
  sprite: Sprite;
};

export interface SpriteTextStringConfig {
  id: string;
  portraitFrame?: number;
  string: string;
}
