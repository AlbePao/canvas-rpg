import { GameLoop } from './lib/GameLoop';
import { LevelBuilder } from './lib/LevelBuilder';
import { Main } from './objects/Main';
import './style.css';

// Grabbing the canvas to draw to
const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

/**
 * Initialize the game: load levels, set up the scene, and start the game loop
 */
// async function initializeGame(): Promise<void> {
//   // Load all levels from JSON before starting the game
//   await LevelsMapper.loadLevels();
// }

// TODO: add logic below inside initializeGame() function
// Establish the root scene
const mainScene = new Main();
mainScene.setLevel(
  // new CaveLevel1(),
  new LevelBuilder({
    id: 'purpleLevel',
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
