import type { GameSettings } from './game.types';

export const DEFAULT_CANVAS_WIDTH = 320;
export const DEFAULT_CANVAS_HEIGHT = 180;
export const GRID_SIZE = 16;
export const TEXT_BOX_BACKDROP_WIDTH = 16; // 256 pixel
export const TEXT_BOX_BACKDROP_HEIGHT = 3; // 48 pixel

export const GAME_SETTINGS_STORAGE_KEY = 'gameSettings';

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  battleAnimations: true,
  textSpeed: 80, // milliseconds per character
};
