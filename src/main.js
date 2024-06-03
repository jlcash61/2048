import { preload, create, update } from './game.js';
import { handleInput, startSwipe, endSwipe } from './input.js';

var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 500, // Increased height for title and score
  backgroundColor: '#bbada0',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

var game = new Phaser.Game(config);
