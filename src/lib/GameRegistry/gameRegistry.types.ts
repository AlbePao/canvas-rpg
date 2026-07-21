import type { DecorationFrames } from '../../objects/Decoration';
import type { AnimationFrame } from '../Animations';
import type { AnimationConfig } from '../FrameIndexPattern';

export const ITEM_TYPES = ['equipable', 'consumable'] as const;
export type ItemType = (typeof ITEM_TYPES)[number];

export interface ItemData {
  itemKey: string;
  name: string;
  type: ItemType;
  frame: number;
}

export type ItemsRegistry = Readonly<Record<string, ItemData>>;
export type DecorationFramesMapRegistry = Readonly<Record<string, DecorationFrames>>;
export type TilesFrameMapRegistry = Readonly<Record<string, number>>;

export interface AnimationRegistry {
  hero: Partial<Record<AnimationFrame, AnimationConfig>>;
  npc: Partial<Record<AnimationFrame, AnimationConfig>>;
  tiles: Record<string, AnimationConfig>;
}

export const ANIMATION_OBJECT_TYPES = ['npc', 'hero', 'tiles'] satisfies readonly (keyof AnimationRegistry)[];
export type AnimationObjectType = (typeof ANIMATION_OBJECT_TYPES)[number];
