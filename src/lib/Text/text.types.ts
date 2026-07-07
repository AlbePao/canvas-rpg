import type { Sprite } from '../../objects/Sprite';

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
