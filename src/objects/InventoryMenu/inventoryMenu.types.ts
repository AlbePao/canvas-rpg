import type { BaseOption } from '../../types/base-option';
import type { ItemKey } from '../Item';

export type ListItem = BaseOption<ListItemValue> & { quantity: number };

export type ListItemValue = ItemKey | 'go_back';
