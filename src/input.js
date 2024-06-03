import { moveTiles } from './utils.js';

export function handleInput(event, scene) {
  if (scene.isPuppyDisplayed) return;

  switch (event.code) {
    case 'ArrowUp':
      moveTiles(0, scene);
      break;
    case 'ArrowDown':
      moveTiles(1, scene);
      break;
    case 'ArrowLeft':
      moveTiles(2, scene);
      break;
    case 'ArrowRight':
      moveTiles(3, scene);
      break;
  }
}

export function startSwipe(pointer, scene) {
  if (scene.isPuppyDisplayed) return;

  scene.startX = pointer.x;
  scene.startY = pointer.y;
}

export function endSwipe(pointer, scene) {
  if (scene.isPuppyDisplayed) return;

  var endX = pointer.x;
  var endY = pointer.y;
  var diffX = endX - scene.startX;
  var diffY = endY - scene.startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (Math.abs(diffX) > scene.swipeThreshold) {
      moveTiles(diffX > 0 ? 3 : 2, scene);
    }
  } else {
    if (Math.abs(diffY) > scene.swipeThreshold) {
      moveTiles(diffY > 0 ? 1 : 0, scene);
    }
  }
}
