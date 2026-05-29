import { Main } from '../../objects/Main';
import { GameLoop } from '../GameLoop';
import { LevelBuilder } from '../LevelBuilder';
import { Singleton } from '../Singleton';
import type { GameCanvasSize, GameConfig } from './game.types';

class GameSingleton extends Singleton<GameSingleton>() {
  private _containerId = '';
  private _canvasWidth = 0;
  private _canvasHeight = 0;

  /**
   * Initialize the game: load levels, set up the scene, and start the game loop
   */
  // async initializeGame(config: Partial<{ containerId: string }>): Promise<void> {
  initializeGame(config: GameConfig): void {
    const { containerId, canvasWidth, canvasHeight } = config;

    // Set the game configs
    this._containerId = `#${containerId}`;
    this._canvasWidth = canvasWidth ?? 320;
    this._canvasHeight = canvasHeight ?? 180;

    // Load all levels from JSON before starting the game
    // await Resources.loadResources();
    // await LevelsMapper.loadLevels();

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
    mainScene.setLevel(
      new LevelBuilder({
        id: 'tilesetLevel',
      }),
    );

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

  getContainerId(): string {
    return this._containerId;
  }

  getContainerSizes(): GameCanvasSize {
    return {
      canvasWidth: this._canvasWidth,
      canvasHeight: this._canvasHeight,
    };
  }
}

// Singleton instance
export const Game = new GameSingleton();
