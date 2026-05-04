import { CollectibleItemData } from '../Item';

export type InventoryItem = Omit<CollectibleItemData, 'position' | 'shouldSkipPickupAnimation'>;
