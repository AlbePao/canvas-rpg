export type Directions = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';

export class Input {
  heldDirections: Directions[] = [];
  keys: Record<string, boolean> = {};
  lastKeys: Record<string, boolean> = {};

  constructor() {
    // TODO: when user only presses a key without holding it, simply turn the hero once instead of adding to the queue. This way we can have more responsive controls for quick taps, while still allowing holding keys for smoother movement
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

  onArrowPressed(direction: Directions): void {
    // Add this arrow to the queue if it's new
    if (!this.heldDirections.includes(direction)) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction: Directions): void {
    const index = this.heldDirections.indexOf(direction);
    if (index !== -1) {
      // Remove this key from the list
      this.heldDirections.splice(index, 1);
    }
  }
}
