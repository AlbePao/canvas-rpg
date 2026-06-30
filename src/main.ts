import { Game } from './lib/Game';
import './style.css';

// Initialize and start the game
Game.initializeGame({ containerId: 'game-container' }).catch((error) => {
  console.error('Failed to initialize game:', error);
});
