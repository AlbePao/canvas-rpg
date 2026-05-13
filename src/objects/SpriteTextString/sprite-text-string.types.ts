import type { Sprite } from '../../lib/Sprite';

export interface Line {
  words: Word[];
  finalCharIndex: number;
}

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
  portraitFrame: number | null;
  string: string[];
}
