import type { BaseOption } from '../../types/base-option';

export type PauseMenuOption = BaseOption<PauseMenuOptionValue>;

export type PauseMenuOptionValue = 'inventory' | 'team' | 'save' | 'options' | 'exit';
