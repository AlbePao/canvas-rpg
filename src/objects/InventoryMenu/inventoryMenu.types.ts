import type { BaseOption } from '../../types/base-option';
import type { ItemKey } from '../Item';

export type InventoryItem = BaseOption<InventoryItemValue> & { quantity: number };

export type InventoryItemValue = ItemKey | 'go_back';
