import { GameLoop } from './lib/GameLoop';
import { LevelBuilder } from './lib/LevelBuilder';
import { Main } from './objects/Main';
import './style.css';

/**
 * Initialize the game: load levels, set up the scene, and start the game loop
 */
// async function initializeGame(config: Partial<{ containerId: string }>): Promise<void> {
//   // Load all levels from JSON before starting the game
//   await Resources.loadResources();
//   await LevelsMapper.loadLevels();
//   const gameContainer = document.querySelector<HTMLDivElement>(config.containerId ?? '#game-container');
// }

// TODO: add logic below inside initializeGame() function
// Grabbing the container to create canvas inside
const gameContainer = document.querySelector<HTMLDivElement>('#game-container');

if (!gameContainer) {
  throw new Error('Game container is not defined');
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
  throw new Error('Canvas context is not defined');
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

// Initialize and start the game
// initializeGame().catch((error) => {
//   console.error('Failed to initialize game:', error);
// });
