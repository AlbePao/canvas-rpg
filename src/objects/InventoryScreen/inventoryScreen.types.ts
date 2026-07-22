import type { BaseOption } from '../../types/base-option';

export type InventoryItem = BaseOption & { quantity: number };

export type InventoryItemActionsValue = 'useItem' | 'throwItem' | 'cancel';
