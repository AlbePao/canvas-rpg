import { DIRECTION_TAP } from '../constants/events';
import { objectKeys } from '../helpers/objectKeys';
import type { Directions } from '../types/directions';
import { Events } from './Events';

const HOLD_THRESHOLD = 120; // milliseconds

const KEY_TO_DIRECTION: Readonly<Record<string, Directions>> = {
  ArrowUp: 'UP',
  KeyW: 'UP',
  ArrowDown: 'DOWN',
  KeyS: 'DOWN',
  ArrowLeft: 'LEFT',
  KeyA: 'LEFT',
  ArrowRight: 'RIGHT',
  KeyD: 'RIGHT',
};

const DIRECTION_KEYS = new Set(objectKeys(KEY_TO_DIRECTION));

function getDirectionFromCode(code: string): Directions | null {
  return KEY_TO_DIRECTION[code] ?? null;
}

export class Input {
  private readonly _pressedKeys = new Set<string>();
  private readonly _justPressedKeys = new Set<string>();

  private readonly _directionPressTime: Record<Directions, number> = {
    UP: 0,
    DOWN: 0,
    LEFT: 0,
    RIGHT: 0,
  };

  private readonly _heldDirections: Directions[] = [];
  private readonly _heldDirectionSet = new Set<Directions>();
  private readonly _pressedDirections = new Set<Directions>();

  constructor() {
    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);
    window.addEventListener('blur', this._reset);
  }

  get direction(): Directions | null {
    return this._heldDirections[0] ?? null;
  }

  update(): void {
    const now = performance.now();

    for (const direction of this._pressedDirections) {
      if (this._heldDirectionSet.has(direction)) {
        continue;
      }

      const pressedAt = this._directionPressTime[direction];
      if (pressedAt > 0 && now - pressedAt >= HOLD_THRESHOLD) {
        this._pushDirectionFront(direction);
      }
    }

    this._justPressedKeys.clear();
  }

  isPressed(keyCode: string): boolean {
    return this._pressedKeys.has(keyCode);
  }

  getActionJustPressed(keyCode: string): boolean {
    return this._justPressedKeys.has(keyCode);
  }

  destroy(): void {
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('keyup', this._handleKeyUp);
    window.removeEventListener('blur', this._reset);
    this._reset();
  }

  private readonly _handleKeyDown = (event: KeyboardEvent): void => {
    const { code, repeat } = event;

    if (DIRECTION_KEYS.has(code)) {
      event.preventDefault();
    }

    if (repeat || this._pressedKeys.has(code)) {
      return;
    }

    this._pressedKeys.add(code);
    this._justPressedKeys.add(code);

    const direction = getDirectionFromCode(code);
    if (!direction) {
      return;
    }

    this._pressedDirections.add(direction);
    this._directionPressTime[direction] = performance.now();

    if (this._heldDirections.length > 0) {
      this._pushDirectionFront(direction);
    }
  };

  private readonly _handleKeyUp = (event: KeyboardEvent): void => {
    const { code } = event;
    this._pressedKeys.delete(code);

    const direction = getDirectionFromCode(code);
    if (!direction) {
      return;
    }

    const pressedAt = this._directionPressTime[direction];
    const heldDuration = pressedAt > 0 ? performance.now() - pressedAt : 0;
    const wasAlreadyMoving = this._heldDirectionSet.has(direction);

    if (heldDuration < HOLD_THRESHOLD && !wasAlreadyMoving) {
      Events.emit(DIRECTION_TAP, direction);
    }

    this._pressedDirections.delete(direction);
    this._directionPressTime[direction] = 0;
    this._removeDirection(direction);
  };

  private _pushDirectionFront(direction: Directions): void {
    if (this._heldDirectionSet.has(direction)) {
      this._removeDirection(direction);
    }

    this._heldDirections.unshift(direction);
    this._heldDirectionSet.add(direction);
  }

  private _removeDirection(direction: Directions): void {
    if (!this._heldDirectionSet.has(direction)) {
      return;
    }

    const index = this._heldDirections.indexOf(direction);
    if (index !== -1) {
      this._heldDirections.splice(index, 1);
    }

    this._heldDirectionSet.delete(direction);
  }

  private readonly _reset = (): void => {
    this._pressedKeys.clear();
    this._justPressedKeys.clear();
    this._pressedDirections.clear();
    this._heldDirections.length = 0;
    this._heldDirectionSet.clear();

    this._directionPressTime.UP = 0;
    this._directionPressTime.DOWN = 0;
    this._directionPressTime.LEFT = 0;
    this._directionPressTime.RIGHT = 0;
  };
}
