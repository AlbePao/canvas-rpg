import { Game, GRID_SIZE, isSpaceFree } from '../../lib/Game';
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
    const halfGridSize = GRID_SIZE / 2;

    if (direction === 'DOWN') {
      nextCharacterY += characterPace;
      nextCharacterX += alignToGrid(nextCharacterX, halfGridSize);
      nextGridY += halfGridSize;
      nextGridX += alignToGrid(nextGridX, halfGridSize);

      this.body.animations?.play('walkDown');
    } else if (direction === 'UP') {
      nextCharacterY -= characterPace;
      nextCharacterX += alignToGrid(nextCharacterX, halfGridSize);
      nextGridY -= halfGridSize;
      nextGridX += alignToGrid(nextGridX, halfGridSize);

      this.body.animations?.play('walkUp');
    } else if (direction === 'LEFT') {
      nextCharacterX -= characterPace;
      nextCharacterY += alignToGrid(nextCharacterY, halfGridSize);
      nextGridX -= halfGridSize;
      nextGridY += alignToGrid(nextGridY, halfGridSize);

      this.body.animations?.play('walkLeft');
    } else if (direction === 'RIGHT') {
      nextCharacterX += characterPace;
      nextCharacterY += alignToGrid(nextCharacterY, halfGridSize);
      nextGridX += halfGridSize;
      nextGridY += alignToGrid(nextGridY, halfGridSize);

      this.body.animations?.play('walkRight');
    }

    this.facingDirection = direction;

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
