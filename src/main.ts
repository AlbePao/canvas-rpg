import { GameLoop } from './GameLoop';
import { LevelBuilder } from './lib/LevelBuilder';
import { Main } from './objects/Main';
import './style.css';

// Grabbing the canvas to draw to
const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

// Establish the root scene
const mainScene = new Main();
mainScene.setLevel(new LevelBuilder());

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
