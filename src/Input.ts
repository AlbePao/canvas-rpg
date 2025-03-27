export const DIRECTIONS = ['LEFT', 'RIGHT', 'UP', 'DOWN'] as const;

export type Directions = (typeof DIRECTIONS)[number];

export class Input {
  heldDirections: Directions[] = [];

  constructor() {
    document.addEventListener('keydown', (event) => {
      const { code } = event;

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

  get direction() {
    return this.heldDirections[0];
  }

  onArrowPressed(direction: Directions) {
    // Add this arrow to the queue if it's new
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction: Directions) {
    const index = this.heldDirections.indexOf(direction);
    if (index !== -1) {
      // Remove this key from the list
      this.heldDirections.splice(index, 1);
    }
  }
}
