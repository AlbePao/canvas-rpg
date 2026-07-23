import type { BaseOption } from '../../types/baseOption';

export type InventoryItem = BaseOption & { quantity: number };

export type InventoryItemActionsValue = 'useItem' | 'throwItem' | 'cancel';
