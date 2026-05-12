import { GRID_SIZE } from '../../constants/gridSize';
import { isSpaceFree } from '../../helpers/grid';
import type { Main } from '../Main';
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
  override tryMove(root: Main): void {
    const { input, level } = root;

    if (!input.direction) {
      if (this.facingDirection === 'LEFT') {
        this.body.animations?.play('standLeft');
      }

      if (this.facingDirection === 'RIGHT') {
        this.body.animations?.play('standRight');
      }

      if (this.facingDirection === 'UP') {
        this.body.animations?.play('standUp');
      }

      if (this.facingDirection === 'DOWN') {
        this.body.animations?.play('standDown');
      }

      return;
    }

    let nextCharacterX = this.destinationPosition.x;
    let nextCharacterY = this.destinationPosition.y;

    let nextGridX = this.destinationPosition.x;
    let nextGridY = this.destinationPosition.y;

    const characterPace = 1;
    const gridSize = GRID_SIZE / 2;

    if (input.direction === 'DOWN') {
      nextCharacterY += characterPace;
      nextCharacterX += alignToGrid(nextCharacterX, gridSize);
      nextGridY += gridSize;
      nextGridX += alignToGrid(nextGridX, gridSize);

      this.body.animations?.play('walkDown');
    }
    if (input.direction === 'UP') {
      nextCharacterY -= characterPace;
      nextCharacterX += alignToGrid(nextCharacterX, gridSize);
      nextGridY -= gridSize;
      nextGridX += alignToGrid(nextGridX, gridSize);

      this.body.animations?.play('walkUp');
    }
    if (input.direction === 'LEFT') {
      nextCharacterX -= characterPace;
      nextCharacterY += alignToGrid(nextCharacterY, gridSize);
      nextGridX -= gridSize;
      nextGridY += alignToGrid(nextGridY, gridSize);

      this.body.animations?.play('walkLeft');
    }
    if (input.direction === 'RIGHT') {
      nextCharacterX += characterPace;
      nextCharacterY += alignToGrid(nextCharacterY, gridSize);
      nextGridX += gridSize;
      nextGridY += alignToGrid(nextGridY, gridSize);

      this.body.animations?.play('walkRight');
    }

    this.facingDirection = input.direction;

    // Validation that the next destination is free
    const spaceIsFree = level && isSpaceFree(level.walls, nextGridX, nextGridY);
    const solidBodyAtSpace = this.parent?.children.find(
      (child) => child.isSolid && child.position.x === nextGridX && child.position.y === nextGridY,
    );

    if (spaceIsFree && !solidBodyAtSpace) {
      this.destinationPosition.x = nextCharacterX;
      this.destinationPosition.y = nextCharacterY;
    }
  }
}
