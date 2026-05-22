import { DIRECTION_TAP } from '../constants/events';
import type { Directions } from '../types/directions';
import { Events } from './Events';

const HOLD_THRESHOLD = 120; // milliseconds

export class Input {
  heldDirections: Directions[] = [];
  keys: Record<string, boolean> = {};
  lastKeys: Record<string, boolean> = {};

  private readonly _directionPressTime: Record<Directions, number> = {
    UP: 0,
    DOWN: 0,
    LEFT: 0,
    RIGHT: 0,
  };

  private readonly _pressedDirections: Set<Directions> = new Set<Directions>();

  constructor() {
    document.addEventListener('keydown', (event) => {
      const { code } = event;

      this.keys[code] = true;

      // Also check for dedicated direction list
      if (code === 'ArrowUp' || code === 'KeyW') {
        this.onArrowPressed('UP');
      }
      if (code === 'ArrowDown' || code === 'KeyS') {
        this.onArrowPressed('DOWN');
      }
      if (code === 'ArrowLeft' || code === 'KeyA') {
        this.onArrowPressed('LEFT');
      }
      if (code === 'ArrowRight' || code === 'KeyD') {
        this.onArrowPressed('RIGHT');
      }
    });

    document.addEventListener('keyup', (event) => {
      const { code } = event;

      this.keys[code] = false;

      // Also check for dedicated direction list
      if (code === 'ArrowUp' || code === 'KeyW') {
        this.onArrowReleased('UP');
      }
      if (code === 'ArrowDown' || code === 'KeyS') {
        this.onArrowReleased('DOWN');
      }
      if (code === 'ArrowLeft' || code === 'KeyA') {
        this.onArrowReleased('LEFT');
      }
      if (code === 'ArrowRight' || code === 'KeyD') {
        this.onArrowReleased('RIGHT');
      }
    });
  }

  get direction(): Directions | null {
    return this.heldDirections[0] ?? null;
  }

  update(): void {
    // Update held directions based on how long they've been pressed
    const now = Date.now();

    if (this._pressedDirections.size > 0) {
      this._pressedDirections.forEach((direction) => {
        const pressTime = this._directionPressTime[direction];
        const holdDuration = now - pressTime;

        // If held long enough, add to heldDirections for movement
        if (holdDuration >= HOLD_THRESHOLD) {
          if (!this.heldDirections.includes(direction)) {
            this.heldDirections.unshift(direction);
          }
        }
      });
    }

    // Diff the keys on previous frame to know when new ones are pressed
    this.lastKeys = { ...this.keys };
  }

  getActionJustPressed(keyCode: string): boolean {
    let justPressed = false;

    if (this.keys[keyCode] && !this.lastKeys[keyCode]) {
      justPressed = true;
    }

    return justPressed;
  }

  isPressed(keyCode: string): boolean {
    return this.keys[keyCode];
  }

  onArrowPressed(direction: Directions): void {
    // Track that this direction key is physically pressed
    this._pressedDirections.add(direction);
    this._directionPressTime[direction] = Date.now();

    // If we're already moving, immediately add this new direction to the front.
    // This allows instant direction changes while moving, avoiding the threshold delay.
    if (this.heldDirections.length > 0 && !this.heldDirections.includes(direction)) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction: Directions): void {
    const pressTime = this._directionPressTime[direction];
    const holdDuration = Date.now() - pressTime;

    // Emit tap event only if this direction never entered movement (was not added to heldDirections)
    // This ensures taps are only emitted for quick, standalone presses, not for direction changes
    if (holdDuration < HOLD_THRESHOLD && !this.heldDirections.includes(direction)) {
      Events.emit(DIRECTION_TAP, direction);
    }

    const index = this.heldDirections.indexOf(direction);
    if (index !== -1) {
      // Remove this key from the list
      this.heldDirections.splice(index, 1);
    }

    // Remove from pressed set
    this._pressedDirections.delete(direction);
    this._directionPressTime[direction] = 0;
  }
}
