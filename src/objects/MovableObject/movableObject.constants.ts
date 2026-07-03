import { SCREEN_TRANSITION_END, SCREEN_TRANSITION_START } from '../../lib/ScreenTransition';
import { BATTLE_END, BATTLE_START } from '../Battle';
import { PAUSE_OFF, PAUSE_ON } from '../PauseMenu';
import { TEXT_BOX_CLOSE, TEXT_BOX_OPEN } from '../TextBox';
import type { MovableObjectLockSource } from './movableObject.types';

// Behavior events
export const BEHAVIOR_END = 'BEHAVIOR_END';

// Cutscene events
export const CUTSCENE_START = 'CUTSCENE_START';
export const CUTSCENE_END = 'CUTSCENE_END';

// Locking events
export const MOVABLE_OBJECT_LOCK_SOURCES: MovableObjectLockSource[] = [
  [BATTLE_START, 'battle'],
  [CUTSCENE_START, 'cutscene'],
  [PAUSE_ON, 'pause'],
  [TEXT_BOX_OPEN, 'textBox'],
  [SCREEN_TRANSITION_START, 'transition'],
];

export const MOVABLE_OBJECT_UNLOCK_SOURCES: MovableObjectLockSource[] = [
  [BATTLE_END, 'battle'],
  [CUTSCENE_END, 'cutscene'],
  [PAUSE_OFF, 'pause'],
  [TEXT_BOX_CLOSE, 'textBox'],
  [SCREEN_TRANSITION_END, 'transition'],
];
