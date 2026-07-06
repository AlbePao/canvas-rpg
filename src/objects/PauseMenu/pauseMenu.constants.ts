import type { PauseMenuItem } from './pauseMenu.types';

// Pause events
export const PAUSE_ON = 'PAUSE_ON';
export const PAUSE_OFF = 'PAUSE_OFF';
export const PAUSE_SUB_MENU_OPEN = 'PAUSE_SUB_MENU_OPEN';
export const PAUSE_SUB_MENU_CLOSE = 'PAUSE_SUB_MENU_CLOSE';
export const PAUSE_SAVE_GAME = 'PAUSE_SAVE_GAME';

export const SAVE_TEXT_BOX_ID = 'save-text-box';
export const PAUSE_MENU_ITEMS: PauseMenuItem[] = [
  { key: 'inventory', text: 'Inventory' },
  { key: 'team', text: 'Team' },
  { key: 'save', text: 'Save' },
  { key: 'settings', text: 'Settings' },
  { key: 'exit', text: 'Exit' },
] as const;
