import { Camera } from './Camera';
import { events } from './Events';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { gridCells } from './helpers/grid';
import { Input } from './Input';
import { Exit } from './objects/Exit/Exit';
import { Hero } from './objects/Hero/Hero';
import { Inventory } from './objects/Inventory/Inventory';
import { Rod } from './objects/Rod/Rod';
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

const exit = new Exit(gridCells(6), gridCells(3));
mainScene.addChild(exit);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6));
mainScene.addChild(rod);

const inventory = new Inventory();

// Add an input class the the main scene
mainScene.input = new Input();

events.on('HERO_EXITS', mainScene, () => {
  console.log('change the map...');
});

// Establish update and draw loops
const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sky
  skySprite.drawImage(ctx, 0, 0);

  // Save the current state
  ctx.save();

  // Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);

  // Restore to original state
  ctx.restore();

  // Draw anything above the game world
  inventory.draw(ctx, 0, 0);
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
