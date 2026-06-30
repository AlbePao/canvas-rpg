import type { PauseMenuOption } from './pauseMenu.types';

// Pause events
export const PAUSE_ON = 'PAUSE_ON';
export const PAUSE_OFF = 'PAUSE_OFF';
export const PAUSE_SUB_MENU_OPEN = 'PAUSE_SUB_MENU_OPEN';
export const PAUSE_SUB_MENU_CLOSE = 'PAUSE_SUB_MENU_CLOSE';
export const PAUSE_SAVE_GAME = 'PAUSE_SAVE_GAME';

export const SAVE_TEXT_BOX_ID = 'save-text-box';
export const PAUSE_MENU_OPTIONS: PauseMenuOption[] = [
  { text: 'Inventory', value: 'inventory' },
  { text: 'Team', value: 'team' },
  { text: 'Save', value: 'save' },
  { text: 'Options', value: 'options' },
  { text: 'Exit', value: 'exit' },
] as const;
