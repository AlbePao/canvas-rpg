import type { DecorationFrames } from '../../objects/Decoration';
import type { ItemKey } from '../../objects/Item';
import type { AnimationConfig } from '../FrameIndexPattern';

export interface ItemData {
  itemKey: ItemKey;
  name: string;
  type: 'equipable' | 'consumable';
  frame: number;
}

export type ItemsRegistry = Readonly<Record<string, ItemData>>;
export type DecorationFramesMapRegistry = Readonly<Record<string, DecorationFrames>>;

export type BooleanRegistry = Readonly<Record<string, true>>;
export type NumberRegistry = Readonly<Record<string, number>>;
export type StringRegistry = Readonly<Record<string, string>>;

export type AnimationRegistry = Record<'npc' | 'hero' | 'tiles', Record<string, Record<string, AnimationConfig>>>;

export type AnimationObjectType = 'npc' | 'hero' | 'tiles';
export type AnimationObjectKey = 'base' | string;
