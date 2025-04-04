import { Camera } from './Camera';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { gridCells } from './helpers/grid';
import { Input } from './Input';
import { Hero } from './objects/Hero/Hero';
import { resources } from './Resource';
import { Sprite } from './Sprite';
import './style.css';
import { Vector2 } from './Vector2';

// Grabbing the canvas to draw to
const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

// TODO: create a class MainScene that extends GameObject
// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

// Build up the scene by adding a sky, ground and hero
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

// Add an input class the the main scene
mainScene.input = new Input();

// Establish update and draw loops
const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.drawImage(ctx, 0, 0);

  // Save the current state
  ctx.save();

  // Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);

  // Restore to original state
  ctx.restore();
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
