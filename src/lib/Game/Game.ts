import { Main } from '../../objects/Main';
import { GameLoop } from '../GameLoop';
import { LevelBuilder } from '../LevelBuilder';
import { Singleton } from '../Singleton';
import type { GameConfig, GameConfigKey } from './game.types';

class GameSingleton extends Singleton<GameSingleton>() {
  private readonly _configs: Record<GameConfigKey, string> = {
    containerId: '',
  };

  /**
   * Initialize the game: load levels, set up the scene, and start the game loop
   */
  // async initializeGame(config: Partial<{ containerId: string }>): Promise<void> {
  initializeGame(config: GameConfig): void {
    const { containerId } = config;

    // Set the game container id
    this._configs.containerId = `#${containerId}`;

    // Load all levels from JSON before starting the game
    // await Resources.loadResources();
    // await LevelsMapper.loadLevels();

    // Grabbing the container to create canvas inside
    const gameContainer = document.querySelector<HTMLDivElement>(this._configs.containerId);

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
    canvas.setAttribute('width', '320');
    canvas.setAttribute('height', '180');
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

  getConfig(key: GameConfigKey): string {
    return this._configs[key];
  }
}

// Singleton instance
export const Game = new GameSingleton();
