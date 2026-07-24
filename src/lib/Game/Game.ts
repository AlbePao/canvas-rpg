import type { Level } from '../../objects/Level';
import { Main } from '../../objects/Main';
import { GameLoop } from '../GameLoop';
import { Input } from '../Input';
import { Singleton } from '../Singleton';
import {
  DEFAULT_CANVAS_HEIGHT,
  DEFAULT_CANVAS_WIDTH,
  DEFAULT_GAME_SETTINGS,
  GAME_SETTINGS_STORAGE_KEY,
} from './game.constants';
import type { GameCanvasSize, GameConfig, GameSettings, GameSettingsKey } from './game.types';

class GameSingleton extends Singleton<GameSingleton>() {
  get settings(): GameSettings {
    return this._settings;
  }
  private _settings = DEFAULT_GAME_SETTINGS;

  get containerId(): string {
    return this._containerId;
  }
  private _containerId = '';

  // Canvas size is set once at init and never changes afterwards, so it's cached to avoid unnecessary new allocations
  get containerSizes(): GameCanvasSize {
    return this._containerSizes;
  }
  private readonly _containerSizes: GameCanvasSize = { canvasWidth: 0, canvasHeight: 0 };

  // Shared keyboard state, and the currently active level - exposed here so GameObjects can read them directly
  readonly input = new Input();
  level: Level | null = null;

  /**
   * Initialize the game: load levels, set up the scene, and start the game loop
   */
  async initializeGame(config: GameConfig): Promise<void> {
    const { containerId, canvasWidth = DEFAULT_CANVAS_WIDTH, canvasHeight = DEFAULT_CANVAS_HEIGHT } = config;

    // Set the game configs
    this._containerId = `#${containerId}`;
    this._containerSizes.canvasWidth = canvasWidth;
    this._containerSizes.canvasHeight = canvasHeight;

    try {
      // Load all game data JSON before starting the game
      const { GameLoader } = await import('../Loaders');
      await GameLoader.loadData();
    } catch (error) {
      console.error('Game initialization failed:', error);
      throw error;
    }

    // Grabbing the container to create canvas inside
    const gameContainer = document.querySelector<HTMLDivElement>(this._containerId);

    if (!gameContainer) {
      throw new Error('Game: game container not found');
    }

    gameContainer.style.width = `${canvasWidth * 3.5}px`;
    gameContainer.style.height = `${canvasHeight * 3.5}px`;

    // Creating the canvas to draw to
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game-canvas');
    canvas.setAttribute('width', `${canvasWidth}`);
    canvas.setAttribute('height', `${canvasHeight}`);
    canvas.style.width = `${canvasWidth * 3.5}px`;
    canvas.style.height = `${canvasHeight * 3.5}px`;
    canvas.style.backgroundColor = '#333';
    canvas.style.imageRendering = 'pixelated';

    gameContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Game: canvas context is not defined');
    }

    // Load game settings from localStorage or set defaults
    this._loadSettings();

    // Load the title screen
    const mainScene = new Main();
    mainScene.startTitleScreen();

    // Establish update and draw loops
    const update = (delta: number): void => {
      mainScene.stepEntry(delta);
      this.input.update();
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

  private _loadSettings(): void {
    const savedSettings = localStorage.getItem(GAME_SETTINGS_STORAGE_KEY);

    if (savedSettings) {
      // If settings exist in localStorage, parse and load them
      this._settings = JSON.parse(savedSettings) as GameSettings;
    } else {
      // If no saved settings, save default settings
      localStorage.setItem(GAME_SETTINGS_STORAGE_KEY, JSON.stringify(this._settings));
    }
  }

  updateSetting(settingKey: GameSettingsKey, value: string | boolean | number): void {
    this._settings = {
      ...this._settings,
      [settingKey]: value,
    };
    localStorage.setItem(GAME_SETTINGS_STORAGE_KEY, JSON.stringify(this._settings));
  }
}

// Singleton instance
export const Game = new GameSingleton();
