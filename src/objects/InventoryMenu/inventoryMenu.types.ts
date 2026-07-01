import type { SelectionOption } from '../SelectionBox';

export type ListItem = Pick<SelectionOption, 'text' | 'value'> & { quantity: number };
