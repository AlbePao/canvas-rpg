import type { SelectionOption } from '../SelectionBox';

export type PauseMenuOption = Omit<SelectionOption, 'response' | 'addsFlag' | 'itemKey'>;
