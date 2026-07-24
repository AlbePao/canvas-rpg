import type { MovableObjectBehavior, MovableObjectConfig } from '../MovableObject';

export type NpcConfig = MovableObjectConfig<NpcBehavior> & {
  npc: string;
};

export type NpcBehavior = MovableObjectBehavior<
  'stand' | 'walk',
  {
    duration?: number;
    speed?: number; // Optional walking speed multiplier
  }
>;
