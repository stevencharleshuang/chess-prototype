$(document).ready(() => {
  // JQ Selectors
  let $gameArea = $('.game-area');
  let $boardSq;
  
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
        $gameArea.append(`
          <div 
            class="board-square white-square" 
            data-num="${i}" 
            data-row="${numNum}" 
            data-col="${String.fromCharCode(alphaNum)}" 
            data-id="${String.fromCharCode(alphaNum)}${numNum}">
          </div>`);
        prevWhite = true;
      } else {
        $gameArea.append(`
          <div 
            class="board-square black-square" 
            data-num="${i}" 
            data-row="${numNum}" 
            data-col="${String.fromCharCode(alphaNum)}" 
            data-id="${String.fromCharCode(alphaNum)}${numNum}">
          </div>`);
        prevWhite = false;
      }

      if (i % 8 === 7) {
        prevWhite = !prevWhite;
        numNum -= 1;
      }

      alphaNum += 1;
    }

    $boardSq = $('.board-square');
  }
  
  // Add the pieces
  const createChessPieces = () => {
    for (let i = 0; i < 64; i += 1) {
      let row = parseInt($boardSq[i].dataset.row);
      let col = $boardSq[i].dataset.col;
      
      // Place Pawns
      if (row === 7) {
        $($boardSq[i]).text('BP');
      } else if (row === 2) {
        $($boardSq[i]).text('WP');
      }

      // Place Kings
      if (row === 8 && col === 'e') {
        $($boardSq[i]).text('BK');
      } else if (row === 1 && col === 'e') {
        $($boardSq[i]).text('WK');
      }

      // Place Queens
      if (row === 8 && col === 'd') {
        $($boardSq[i]).text('BQ');
      } else if (row === 1 && col === 'd') {
        $($boardSq[i]).text('WQ');
      }

      // Place Bishops
      if (row === 8 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).text('BB');
      } else if (row === 1 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).text('WB');
      }     

      // Place Knights
      if (row === 8 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).text('BK');
      } else if (row === 1 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).text('WK');
      }    

      // Place Rooks
      if (row === 8 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).text('BR');
      } else if (row === 1 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).text('WR');
      }    
    }
  }

  createBoard();
  createChessPieces();
});