import type { BaseOption } from '../../types/base-option';

export type PauseMenuItem = BaseOption<PauseMenuItemValue>;

export type PauseMenuItemValue = 'inventory' | 'team' | 'save' | 'settings' | 'exit';
