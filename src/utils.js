export function moveTiles(direction, scene) {
    let moved = false;
  
    if (direction === 0) { // Up
      for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
          if (scene.grid[row][col] !== 0) {
            let targetRow = row;
            while (targetRow > 0 && scene.grid[targetRow - 1][col] === 0) {
              scene.grid[targetRow - 1][col] = scene.grid[targetRow][col];
              scene.grid[targetRow][col] = 0;
              targetRow--;
              moved = true;
            }
            if (targetRow > 0 && scene.grid[targetRow - 1][col] === scene.grid[targetRow][col]) {
              scene.grid[targetRow - 1][col] *= 2;
              scene.grid[targetRow][col] = 0;
              scene.score += scene.grid[targetRow - 1][col];
              moved = true;
              checkPuppyThreshold(scene.grid[targetRow - 1][col], scene);
            }
          }
        }
      }
    } else if (direction === 1) { // Down
      for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
          if (scene.grid[row][col] !== 0) {
            let targetRow = row;
            while (targetRow < 3 && scene.grid[targetRow + 1][col] === 0) {
              scene.grid[targetRow + 1][col] = scene.grid[targetRow][col];
              scene.grid[targetRow][col] = 0;
              targetRow++;
              moved = true;
            }
            if (targetRow < 3 && scene.grid[targetRow + 1][col] === scene.grid[targetRow][col]) {
              scene.grid[targetRow + 1][col] *= 2;
              scene.grid[targetRow][col] = 0;
              scene.score += scene.grid[targetRow + 1][col];
              moved = true;
              checkPuppyThreshold(scene.grid[targetRow + 1][col], scene);
            }
          }
        }
      }
    } else if (direction === 2) { // Left
      for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
          if (scene.grid[row][col] !== 0) {
            let targetCol = col;
            while (targetCol > 0 && scene.grid[row][targetCol - 1] === 0) {
              scene.grid[row][targetCol - 1] = scene.grid[row][targetCol];
              scene.grid[row][targetCol] = 0;
              targetCol--;
              moved = true;
            }
            if (targetCol > 0 && scene.grid[row][targetCol - 1] === scene.grid[row][targetCol]) {
              scene.grid[row][targetCol - 1] *= 2;
              scene.grid[row][targetCol] = 0;
              scene.score += scene.grid[row][targetCol - 1];
              moved = true;
              checkPuppyThreshold(scene.grid[row][targetCol - 1], scene);
            }
          }
        }
      }
    } else if (direction === 3) { // Right
      for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
          if (scene.grid[row][col] !== 0) {
            let targetCol = col;
            while (targetCol < 3 && scene.grid[row][targetCol + 1] === 0) {
              scene.grid[row][targetCol + 1] = scene.grid[row][targetCol];
              scene.grid[row][targetCol] = 0;
              targetCol++;
              moved = true;
            }
            if (targetCol < 3 && scene.grid[row][targetCol + 1] === scene.grid[row][targetCol]) {
              scene.grid[row][targetCol + 1] *= 2;
              scene.grid[row][targetCol] = 0;
              scene.score += scene.grid[row][targetCol + 1];
              moved = true;
              checkPuppyThreshold(scene.grid[row][targetCol + 1], scene);
            }
          }
        }
      }
    }
  
    if (moved) {
      addTile(scene);
      drawGrid(scene);
      scene.scoreText.setText('Score: ' + scene.score);
      updateHighScore(scene);
      saveGameState(scene);
      checkGameOver(scene);
      checkWinCondition(scene);
    }
  }
  
  export function addTile(scene) {
    let emptyTiles = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (scene.grid[row][col] === 0) {
          emptyTiles.push({ row: row, col: col });
        }
      }
    }
    if (emptyTiles.length > 0) {
      let newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      scene.grid[newTile.row][newTile.col] = Math.random() < 0.9 ? 2 : 4;
    }
  }
  
  export function drawGrid(scene) {
    scene.tileObjects.forEach(tile => tile.destroy());
    scene.tileObjects = [];
  
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let value = scene.grid[row][col];
        let x = col * scene.tileSize;
        let y = row * scene.tileSize + 100;
        let color = getColor(value);
        let tile = scene.add.rectangle(x + scene.tileSize / 2, y + scene.tileSize / 2, scene.tileSize - 10, scene.tileSize - 10, color).setStrokeStyle(2, 0x776e65);
        scene.tileObjects.push(tile);
        if (value !== 0) {
          let text = scene.add.text(x + scene.tileSize / 2, y + scene.tileSize / 2, value, { fontSize: '32px', color: '#776e65' }).setOrigin(0.5);
          scene.tileObjects.push(text);
        }
      }
    }
  }
  
  export function getColor(value) {
    switch (value) {
      case 2: return 0xeee4da;
      case 4: return 0xede0c8;
      case 8: return 0xf2b179;
      case 16: return 0xf59563;
      case 32: return 0xf67c5f;
      case 64: return 0xf65e3b;
      case 128: return 0xedcf72;
      case 256: return 0xedcc61;
      case 512: return 0xedc850;
      case 1024: return 0xedc53f;
      case 2048: return 0xedc22e;
      default: return 0xcdc1b4;
    }
  }
  
  export function checkPuppyThreshold(tileValue, scene) {
    if (tileValue === 256) {
      showPuppyImage('puppy1', scene);
    } else if (tileValue === 512) {
      showPuppyImage('puppy2', scene);
    } else if (tileValue === 1024) {
      showPuppyImage('puppy3', scene);
    } else if (tileValue === 2048) {
      showPuppyImage('puppy4', scene);
    }
  }
  
  export function showPuppyImage(puppyImageKey, scene) {
    scene.puppyImage = scene.add.image(200, 250, puppyImageKey).setScale(0.5).setDepth(1);
    scene.isPuppyDisplayed = true;
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('continueButton').onclick = () => clearPuppyImage(scene);
  }
  
  export function clearPuppyImage(scene) {
    scene.puppyImage.destroy();
    scene.isPuppyDisplayed = false;
    document.getElementById('continueButton').style.display = 'none';
  }
  
  export function checkGameOver(scene) {
    if (!canMove(scene)) {
      document.getElementById('message').textContent = 'Game Over';
      document.getElementById('message').style.display = 'block';
      document.getElementById('resetButton').style.display = 'block';
      document.getElementById('resetButton').onclick = () => resetGame(scene);
    }
  }
  
  export function canMove(scene) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (scene.grid[row][col] === 0) {
          return true;
        }
      }
    }
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (row < 3 && scene.grid[row][col] === scene.grid[row + 1][col]) {
          return true;
        }
        if (col < 3 && scene.grid[row][col] === scene.grid[row][col + 1]) {
          return true;
        }
      }
    }
    return false;
  }
  
  export function checkWinCondition(scene) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (scene.grid[row][col] === 2048) {
          document.getElementById('message').textContent = 'You Win!';
          document.getElementById('message').style.display = 'block';
          document.getElementById('resetButton').style.display = 'block';
          document.getElementById('resetButton').onclick = () => resetGame(scene);
        }
      }
    }
  }
  
  export function updateHighScore(scene) {
    var highScore = localStorage.getItem('highScore') || 0;
    if (scene.score > highScore) {
      highScore = scene.score;
      scene.highScoreText.setText('High Score: ' + highScore);
      localStorage.setItem('highScore', highScore);
    }
  }
  
  export function saveGameState(scene) {
    const gameState = {
      grid: scene.grid,
      score: scene.score
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }
  
  export function resetGame(scene) {
    scene.grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    scene.score = 0;
    scene.isPuppyDisplayed = false;
    drawGrid(scene);
    addTile(scene);
    addTile(scene);
    scene.scoreText.setText('Score: 0');
    document.getElementById('message').style.display = 'none';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    saveGameState(scene);
  }
  