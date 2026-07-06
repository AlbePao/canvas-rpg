import type { BaseOption } from '../../types/base-option';

export type TitleScreenOption = BaseOption<TitleScreenOptionValue>;

export type TitleScreenOptionValue = 'new_game' | 'load_game' | 'options';
