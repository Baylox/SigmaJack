import { startNewGame, handleHit, handleStand } from './gameState.js';

// Écouteurs d'événements
document.getElementById('new-game-button').addEventListener('click', startNewGame);
document.getElementById('hit-button').addEventListener('click', handleHit);
document.getElementById('stand-button').addEventListener('click', handleStand);

// Démarrer la première partie
startNewGame();