import { checkPuppyThreshold, saveGameState, updateHighScore, checkGameOver, checkWinCondition, addTile, drawGrid, resetGame } from './utils.js';
import { handleInput, startSwipe, endSwipe } from './input.js';

export function preload() {
  this.load.image('puppy1', 'images/puppy1.jpg');
  this.load.image('puppy2', 'images/puppy2.jpg');
  this.load.image('puppy3', 'images/puppy3.jpg');
  this.load.image('puppy4', 'images/puppy4.jpg');
}

export function create() {
  var highScore = localStorage.getItem('highScore') || 0;
  var savedGame = JSON.parse(localStorage.getItem('gameState'));

  this.grid = savedGame ? savedGame.grid : [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  this.score = savedGame ? savedGame.score : 0;
  this.tileSize = 100;
  this.tileObjects = [];

  this.add.text(200, 20, '2048', { fontSize: '48px', color: '#776e65' }).setOrigin(0.5);
  this.scoreText = this.add.text(200, 50, 'Score: ' + this.score, { fontSize: '24px', color: '#776e65' }).setOrigin(0.5);
  this.highScoreText = this.add.text(200, 80, 'High Score: ' + highScore, { fontSize: '24px', color: '#776e65' }).setOrigin(0.5);

  this.input.keyboard.on('keydown', (event) => handleInput(event, this));
  this.input.on('pointerdown', (pointer) => startSwipe(pointer, this));
  this.input.on('pointerup', (pointer) => endSwipe(pointer, this));

  document.getElementById('newGameButton').onclick = () => resetGame(this);
  drawGrid(this);
}

export function update() {
  // Game loop logic if needed
}
