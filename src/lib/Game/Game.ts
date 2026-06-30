import { Main } from '../../objects/Main';
import type { Coords, Walls } from '../../types/coords';
import { GameLoop } from '../GameLoop';
import type { GameObject } from '../GameObject';
import { LevelsMapper } from '../LevelsMapper';
import { Singleton } from '../Singleton';
import type { Vector2 } from '../Vector2';
import type { GameCanvasSize, GameConfig } from './game.types';

class GameSingleton extends Singleton<GameSingleton>() {
  get containerId(): string {
    return this._containerId;
  }
  private _containerId = '';

  get containerSizes(): GameCanvasSize {
    return {
      canvasWidth: this._canvasWidth,
      canvasHeight: this._canvasHeight,
    };
  }

  private _canvasWidth = 0;
  private _canvasHeight = 0;

  get gridSize(): number {
    return this._gridSize;
  }
  private readonly _gridSize = 16;

  readonly textBoxBackdropWidth = 16; // 256 pixel
  readonly textBoxBackdropHeight = 3; // 48 pixel

  /**
   * Initialize the game: load levels, set up the scene, and start the game loop
   */
  async initializeGame(config: GameConfig): Promise<void> {
    // TODO: put values in default constants
    const { containerId, canvasWidth = 320, canvasHeight = 180 } = config;

    // Set the game configs
    this._containerId = `#${containerId}`;
    this._canvasWidth = canvasWidth;
    this._canvasHeight = canvasHeight;

    // Load all levels from JSON before starting the game
    await LevelsMapper.loadLevels();

    // Grabbing the container to create canvas inside
    const gameContainer = document.querySelector<HTMLDivElement>(this._containerId);

    if (!gameContainer) {
      throw new Error('Game: game container not found');
    }

    gameContainer.style.position = 'relative';
    gameContainer.style.margin = '0 auto';
    // gameContainer.style.width = '640px';
    // gameContainer.style.height = '360px';

    // Creating the canvas to draw to
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game-canvas');
    canvas.setAttribute('width', `${this._canvasWidth}`);
    canvas.setAttribute('height', `${this._canvasHeight}`);
    canvas.style.width = '100%';
    canvas.style.backgroundColor = '#333';
    canvas.style.imageRendering = 'pixelated';

    gameContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Game: canvas context is not defined');
    }

    // Establish the root scene
    const mainScene = new Main();
    mainScene.startTitleScreen();

    // Establish update and draw loops
    const update = (delta: number): void => {
      mainScene.stepEntry(delta, mainScene);
      mainScene.input.update();
    };

    const draw = (): void => {
      // Clear anything stale
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the sky
      mainScene.drawBackground(ctx);

      // Save the current state
      ctx.save();

      // Offset by camera position (quantize to integer pixels to prevent jitter)
      const cameraX = Math.floor(mainScene.camera.position.x);
      const cameraY = Math.floor(mainScene.camera.position.y);
      ctx.translate(cameraX, cameraY);

      // Draw objects in the mounted scene
      mainScene.drawObjects(ctx);

      // Restore to original state
      ctx.restore();

      // Draw anything above the game world
      mainScene.drawForeground(ctx);
    };

    // Start the game
    const gameLoop = new GameLoop(update, draw);
    gameLoop.start();
  }

  toGridSize = (value: number): number => value * this._gridSize;
  fromGridSize = (value: number): number => value / this._gridSize;

  detectOverlap(heroPosition: Vector2, objectPosition: Vector2): boolean {
    // detect overlap
    const roundedHeroX = Math.round(heroPosition.x);
    const roundedHeroY = Math.round(heroPosition.y);

    return roundedHeroX === objectPosition.x && roundedHeroY === objectPosition.y;
  }

  isSpaceFree = (walls: Walls, x: number, y: number): boolean => {
    // Convert to string for easy lookup
    const str: Coords = `${x},${y}`;
    // Check if walls has an entry at this spot
    const isWallPresent = walls.has(str);

    return !isWallPresent;
  };

  moveTowards(person: GameObject, destinationPosition: Vector2, speed: number): number {
    const distanceTravelX = destinationPosition.x - person.position.x;
    const distanceTravelY = destinationPosition.y - person.position.y;

    // Calculate distance once (using square formula directly)
    const distance = Math.sqrt(distanceTravelX * distanceTravelX + distanceTravelY * distanceTravelY);

    if (distance <= speed) {
      // If we're close enough, just move directly to the destination
      person.position.x = destinationPosition.x;
      person.position.y = destinationPosition.y;
      return 0;
    }

    // Normalize and move by speed
    const normalizedX = distanceTravelX / distance;
    const normalizedY = distanceTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    // Return remaining distance without recalculation
    const remainingX = destinationPosition.x - person.position.x;
    const remainingY = destinationPosition.y - person.position.y;

    return Math.sqrt(remainingX * remainingX + remainingY * remainingY);
  }
}

// Singleton instance
export const Game = new GameSingleton();
