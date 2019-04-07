$(document).ready(() => {
  // JQ Selectors
  let $gameArea = $('.game-area');
  
  // Make the board
  const createBoard = () => {
    let prevWhite = false;
    let numNum = 8;
    let alphaNum = 97;

    for (let i = 0; i < 64; i += 1) {
      if (alphaNum > 104) {
        alphaNum = 97;
      }

      if (!prevWhite) {
        $gameArea.append(`<div class="board-square white-square" data-num="${i}" data-id="${String.fromCharCode(alphaNum)}${numNum}"></div>`);
        prevWhite = true;
      } else {
        $gameArea.append(`<div class="board-square black-square" data-num="${i}" data-id="${String.fromCharCode(alphaNum)}${numNum}"></div>`);
        prevWhite = false;
      }

      if (i % 8 === 7) {
        prevWhite = !prevWhite;
        numNum -= 1;
      }

      alphaNum += 1;
    }
  }
  
  createBoard();
});