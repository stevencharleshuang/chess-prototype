$(document).ready(() => {
  // JQ Selectors
  let $gameArea = $('.game-area');
  
  // Make the board
  const createBoard = () => {
    let prevWhite = false;

    for (let i = 0; i < 64; i += 1) {
      if (!prevWhite) {
        $gameArea.append(`<div class="board-square white-square" data-num="${i}" data-id></div>`);
        prevWhite = true;
      } else {
        $gameArea.append(`<div class="board-square black-square" data-num="${i}" data-id></div>`);
        prevWhite = false;
      }
      if (i % 8 === 7) {
        prevWhite = !prevWhite;
      }
    }
  }
  
  createBoard();
});