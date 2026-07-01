import { Main } from '../../objects/Main';
import type { Coords, Walls } from '../../types/coords';
import { GameLoop } from '../GameLoop';
import type { GameObject } from '../GameObject';
import { LevelsMapper } from '../LevelsMapper';
import { Singleton } from '../Singleton';
import type { Vector2 } from '../Vector2';
import {
  DEFAULT_CANVAS_HEIGHT,
  DEFAULT_CANVAS_WIDTH,
  GRID_SIZE,
  TEXT_BOX_BACKDROP_HEIGHT,
  TEXT_BOX_BACKDROP_WIDTH,
} from './game.constants';
import type { GameCanvasSize, GameConfig } from './game.types';

class GameSingleton extends Singleton<GameSingleton>() {
  get containerId(): string {
    return this._containerId;
  }
  private _containerId = '';

  get containerSizes(): GameCanvasSize {
    return this._containerSizes;
  }

  // Cached object reused across getter calls to avoid a new allocation on every read (canvas size is set once at init and never changes afterwards).
  private readonly _containerSizes: GameCanvasSize = { canvasWidth: 0, canvasHeight: 0 };

  get gridSize(): number {
    return this._gridSize;
  }
  private readonly _gridSize = GRID_SIZE;

  readonly textBoxBackdropWidth = TEXT_BOX_BACKDROP_WIDTH;
  readonly textBoxBackdropHeight = TEXT_BOX_BACKDROP_HEIGHT;

  /**
   * Initialize the game: load levels, set up the scene, and start the game loop
   */
  async initializeGame(config: GameConfig): Promise<void> {
    const { containerId, canvasWidth = DEFAULT_CANVAS_WIDTH, canvasHeight = DEFAULT_CANVAS_HEIGHT } = config;

    // Set the game configs
    this._containerId = `#${containerId}`;
    this._containerSizes.canvasWidth = canvasWidth;
    this._containerSizes.canvasHeight = canvasHeight;

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
    canvas.setAttribute('width', `${canvasWidth}`);
    canvas.setAttribute('height', `${canvasHeight}`);
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

    // Compare squared magnitudes first to avoid a sqrt call entirely on the (common) arrival frame
    const distanceSquared = distanceTravelX * distanceTravelX + distanceTravelY * distanceTravelY;

    if (distanceSquared <= speed * speed) {
      // If we're close enough, just move directly to the destination
      person.position.x = destinationPosition.x;
      person.position.y = destinationPosition.y;
      return 0;
    }

    // Only pay for sqrt once we know normalization is actually needed
    const distance = Math.sqrt(distanceSquared);
    const normalizedX = distanceTravelX / distance;
    const normalizedY = distanceTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    // Moving by `speed` along the normalized direction reduces the distance by exactly `speed`
    // (the normalized vector has magnitude 1), so no second sqrt is needed to get the remainder.
    return distance - speed;
  }
}

// Singleton instance
export const Game = new GameSingleton();
