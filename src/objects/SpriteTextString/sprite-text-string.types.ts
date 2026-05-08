import { Sprite } from '../../lib/Sprite';

export interface Word {
  wordWidth: number;
  chars: Char[];
}

export interface Char {
  width: number;
  sprite: Sprite;
}

export interface SpriteTextStringConfig {
  id: string;
  portraitFrame?: number;
  string: string;
}
