import { Game, GRID_SIZE } from '../../lib/Game';
import { isSpaceFree } from '../Level';
import { Hero } from './Hero';

function alignToGrid(val: number, alignTo: number): number {
  const remainder = val % alignTo;
  const halfway = alignTo / 2;

  if (remainder > halfway) {
    // We're in the upper half, so we round to the next multiple
    return alignTo - remainder;
  } else {
    // We're in the lower half, so we round to the prev multiple
    return -remainder;
  }
}

export class HeroSnappedMovement extends Hero {
  // Based on https://dev.to/robotspacefish/game-studies-link-s-movement-in-the-legend-of-zelda-48od
  override tryMove(): void {
    const {
      input: { direction },
      level,
    } = Game;

    if (!direction) {
      if (this.facingDirection === 'left') {
        this.body.animations?.play('standLeft');
      }

      if (this.facingDirection === 'right') {
        this.body.animations?.play('standRight');
      }

      if (this.facingDirection === 'up') {
        this.body.animations?.play('standUp');
      }

      if (this.facingDirection === 'down') {
        this.body.animations?.play('standDown');
      }

      return;
    }

    let nextCharacterX = this.destinationPosition.x;
    let nextCharacterY = this.destinationPosition.y;

    let nextGridX = this.destinationPosition.x;
    let nextGridY = this.destinationPosition.y;

    const characterPace = 1;
    const halfGridSize = GRID_SIZE / 2;

    if (direction === 'down') {
      nextCharacterY += characterPace;
      nextCharacterX += alignToGrid(nextCharacterX, halfGridSize);
      nextGridY += halfGridSize;
      nextGridX += alignToGrid(nextGridX, halfGridSize);

      this.body.animations?.play('walkDown');
    } else if (direction === 'up') {
      nextCharacterY -= characterPace;
      nextCharacterX += alignToGrid(nextCharacterX, halfGridSize);
      nextGridY -= halfGridSize;
      nextGridX += alignToGrid(nextGridX, halfGridSize);

      this.body.animations?.play('walkUp');
    } else if (direction === 'left') {
      nextCharacterX -= characterPace;
      nextCharacterY += alignToGrid(nextCharacterY, halfGridSize);
      nextGridX -= halfGridSize;
      nextGridY += alignToGrid(nextGridY, halfGridSize);

      this.body.animations?.play('walkLeft');
    } else if (direction === 'right') {
      nextCharacterX += characterPace;
      nextCharacterY += alignToGrid(nextCharacterY, halfGridSize);
      nextGridX += halfGridSize;
      nextGridY += alignToGrid(nextGridY, halfGridSize);

      this.body.animations?.play('walkRight');
    }

    this.facingDirection = direction;

    // Validation that the next destination is free
    const spaceIsFree = isSpaceFree(nextGridX, nextGridY, level?.walls);
    const isBlocked = level?.hasSolidObjectAt(nextGridX, nextGridY);

    if (spaceIsFree && !isBlocked) {
      this.setNewDestination(nextCharacterX, nextCharacterY); // O(1) automatic grid update
    }
  }
}
