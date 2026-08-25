import type { Directions } from '../../types/directions';
import { Game } from '../Game';
import { KEY_TO_DIRECTION } from './input.constants';

export function getDirectionFromCode(code: string): Directions | null {
  return Object.prototype.hasOwnProperty.call(KEY_TO_DIRECTION, code) ? KEY_TO_DIRECTION[code] : null;
}

export function userPressEnterKeys(): boolean {
  const { getActionJustPressed } = Game.input;

  return getActionJustPressed('Space') || getActionJustPressed('Enter');
}

export function userPressExitKeys(): boolean {
  return Game.input.getActionJustPressed('KeyQ');
}

export function userPressEscapeKey(): boolean {
  return Game.input.getActionJustPressed('Escape');
}

export function userPressDirectionKeys(direction: Directions): boolean {
  const keyCode = Object.keys(KEY_TO_DIRECTION).find((code) => KEY_TO_DIRECTION[code] === direction);

  return keyCode ? Game.input.getActionJustPressed(keyCode) : false;
}
