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
            id="${String.fromCharCode(alphaNum)}${numNum}"
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
            id="${String.fromCharCode(alphaNum)}${numNum}"
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

    let movesArr = [];
    let $piece;

    // Event Handlers
    $($boardSq).on('click', (e) => {
      console.log(e);
      if (e.target.id.length > 4) {
        $piece = e.target.id;
      }
      
      if (movesArr.length > 2) {
        movesArr = [];
      }

      movesArr.push(e.target.dataset.id);

      if (movesArr.length === 2) {
        let start = movesArr[0];
        let end = movesArr[1];
        console.log('Piece Movin Ova Hea', { start, end, $piece });
        movePiece(start, end, $piece);
      }

      console.log({$piece});
      console.log(e.target.dataset.id);

    });
  };
  
  // Add the pieces
  const createChessPieces = () => {
    for (let i = 0; i < 64; i += 1) {
      let row = parseInt($boardSq[i].dataset.row);
      let col = $boardSq[i].dataset.col;
      
      // Place Pawns
      if (row === 7) {
        $($boardSq[i]).append(`<div class="pawn black-pawn" data-piece-type="pawn" id="pawn-${col}${row}">BP</div>`);
      } else if (row === 2) {
        $($boardSq[i]).append(`<div class="pawn white-pawn" data-piece-type="pawn" id="pawn-${col}${row}">WP</div>`);
      }

      // Place Kings
      if (row === 8 && col === 'e') {
        $($boardSq[i]).append(`<div class="king black-king" data-piece-type="" id="king-${col}${row}">BK</div>`);
      } else if (row === 1 && col === 'e') {
        $($boardSq[i]).append(`<div class="king white-king" data-piece-type="" id="king-${col}${row}">WK</div>`);
      }

      // Place Queens
      if (row === 8 && col === 'd') {
        $($boardSq[i]).append(`<div class="queen black-queen" data-piece-type="" id="queen-${col}${row}">BQ</div>`);
      } else if (row === 1 && col === 'd') {
        $($boardSq[i]).append(`<div class="queen white-queen" data-piece-type="" id="queen-${col}${row}">WQ</div>`);
      }

      // Place Bishops
      if (row === 8 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).append(`<div class="bishop black-bishop" data-piece-type="" id="bishop-${col}${row}">BB</div>`);
      } else if (row === 1 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).append(`<div class="bishop white-bishop" data-piece-type="" id="bishop-${col}${row}">WB</div>`);
      }     

      // Place Knights
      if (row === 8 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).append(`<div class="knight black-knight" data-piece-type="" id="knight-${col}${row}">BK</div>`);
      } else if (row === 1 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).append(`<div class="knight white-knight" data-piece-type="" id="knight-${col}${row}">WK</div>`);
      }    

      // Place Rooks
      if (row === 8 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).append(`<div class="rook black-rook" data-piece-type="" id="rook-${col}${row}">BR</div>`);
      } else if (row === 1 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).append(`<div class="rook white-rook" data-piece-type="" id="rook-${col}${row}">WR</div>`);
      }    
    }
  };

  const movePiece = (start, end, piece) => {
    let $pieceMovin = $(`#${piece}`)[0];
    let endSq = document.querySelector(`#${end}`);
    console.log({start, end, endSq, piece, $pieceMovin });
    endSq.append($pieceMovin);
  };

  

  // Boilerplate Function Invocations
  createBoard();
  createChessPieces();
});