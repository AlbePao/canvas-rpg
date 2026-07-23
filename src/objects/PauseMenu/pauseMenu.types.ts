import type { BaseOption } from '../../types/baseOption';

export type PauseMenuItem = BaseOption<PauseMenuItemValue>;

export type PauseMenuItemValue = 'inventory' | 'team' | 'save' | 'settings' | 'exit';
