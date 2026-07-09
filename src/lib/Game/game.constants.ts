import type { GameSettings } from './game.types';

export const DEFAULT_CANVAS_WIDTH = 320;
export const DEFAULT_CANVAS_HEIGHT = 180;
export const GRID_SIZE = 16;
export const TEXT_BOX_BACKDROP_WIDTH = 16; // 256 pixel
export const TEXT_BOX_BACKDROP_HEIGHT = 3; // 48 pixel

export const SELECTION_INDICATOR_OFFSET = 6; // offset from the left of the selection box
export const SELECTION_INDICATOR_X_OFFSET = 24; // offset from the left of the selection indicator
export const SELECTION_INDICATOR_Y_OFFSET = 10; // offset from the top of the selection box

export const GAME_SETTINGS_STORAGE_KEY = 'gameSettings';

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  battleAnimations: true,
  textSpeed: 80, // milliseconds per character
};
