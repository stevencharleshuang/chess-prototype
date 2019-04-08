$(document).ready(() => {
  // JQ Selectors
  let $gameArea = $('.game-area'),
    $gameBoard,
    $boardSq,
    $piece,
    $destinationSquare;
    
  let movesArr = [];
  
  // Make the board
  const createBoard = () => {
    $gameArea.append(`<div class="game-board" />`);
    $gameBoard = $('.game-board');
    let prevWhite = false;
    let numNum = 8;
    let alphaNum = 97;

    for (let i = 0; i < 64; i += 1) {
      if (alphaNum > 104) {
        alphaNum = 97;
      }

      if (!prevWhite) {
        $gameBoard.append(`
          <div 
            class="board-square white-square" 
            id="board-square-${String.fromCharCode(alphaNum)}${numNum}"
            data-num="${i}" 
            data-row="${numNum}" 
            data-col="${String.fromCharCode(alphaNum)}" 
            data-id="${String.fromCharCode(alphaNum)}${numNum}">
          </div>`);
        prevWhite = true;
      } else {
        $gameBoard.append(`
          <div 
            class="board-square black-square"
            id="board-square-${String.fromCharCode(alphaNum)}${numNum}"
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
      $boardSq = $('.board-square');
    }

    // Event Handlers
    // Clicks

    // Reset Game
    $('.reset-btn').on('click', resetBoard);

    // Game Moves
    $($boardSq).on('click', (e) => {
      // console.log(e);
      if (e.target.className.split(' ').indexOf('piece') > -1 && 
        movesArr.length === 0) 
      {
        // console.log('Piece Selected: ', e.target.id);
        $piece = $(`#${e.target.id}`);
        movesArr.push($piece);
      }

      if (e.target.className.split(' ').indexOf('board-square') > -1 &&
        movesArr.length === 1 &&
        e.target.dataset.id !== $piece[0].dataset.location) 
      {
        // console.log('Destination Square Selected: ', movesArr[0], '$piece:', $piece[0].dataset.location);
        $destinationSquare = $(`#${e.target.id}`)
        movesArr.push($destinationSquare);

        movePiece(...movesArr);

        movesArr = [];
      };
      
      if (movesArr.length > 2) {
        movesArr = [];
      }

    });
  };
  
  // Add the pieces
  const createChessPieces = () => {
    for (let i = 0; i < 64; i += 1) {
      let row = parseInt($boardSq[i].dataset.row);
      let col = $boardSq[i].dataset.col;
      
      // Place Pawns
      if (row === 7) {
        $($boardSq[i]).append(`<div class="piece piece-black pawn black-pawn" data-piece-type="pawn" data-location="${col}${row}" id="pawn-${col}${row}">BP</div>`);
      } else if (row === 2) {
        $($boardSq[i]).append(`<div class="piece piece-white pawn white-pawn" data-piece-type="pawn" data-location="${col}${row}" id="pawn-${col}${row}">WP</div>`);
      }

      // Place Kings
      if (row === 8 && col === 'e') {
        $($boardSq[i]).append(`<div class="piece piece-black king black-king" data-piece-type="king" data-location="${col}${row}" id="king-${col}${row}">BK</div>`);
      } else if (row === 1 && col === 'e') {
        $($boardSq[i]).append(`<div class="piece piece-white king white-king" data-piece-type="king" data-location="${col}${row}" id="king-${col}${row}">WK</div>`);
      }

      // Place Queens
      if (row === 8 && col === 'd') {
        $($boardSq[i]).append(`<div class="piece piece-black queen black-queen" data-piece-type="queen" data-location="${col}${row}" id="queen-${col}${row}">BQ</div>`);
      } else if (row === 1 && col === 'd') {
        $($boardSq[i]).append(`<div class="piece piece-white queen white-queen" data-piece-type="queen" data-location="${col}${row}" id="queen-${col}${row}">WQ</div>`);
      }

      // Place Bishops
      if (row === 8 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).append(`<div class="piece piece-black bishop black-bishop" data-piece-type="bishop" data-location="${col}${row}" id="bishop-${col}${row}">BB</div>`);
      } else if (row === 1 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).append(`<div class="piece piece-white bishop white-bishop" data-piece-type="bishop" data-location="${col}${row}" id="bishop-${col}${row}">WB</div>`);
      }     

      // Place Knights
      if (row === 8 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).append(`<div class="piece piece-black knight black-knight" data-piece-type="knight" data-location="${col}${row}" id="knight-${col}${row}">BK</div>`);
      } else if (row === 1 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).append(`<div class="piece piece-white knight white-knight" data-piece-type="knight" data-location="${col}${row}" id="knight-${col}${row}">WK</div>`);
      }    

      // Place Rooks
      if (row === 8 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).append(`<div class="piece piece-black rook black-rook" data-piece-type="rook" data-location="${col}${row}" id="rook-${col}${row}">BR</div>`);
      } else if (row === 1 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).append(`<div class="piece piece-white rook white-rook" data-piece-type="rook" data-location="${col}${row}" id="rook-${col}${row}">WR</div>`);
      }    
    }
  };

  const movePiece = (piece, destination) => {
    console.log('movePiece() called! Args: ', piece, destination);
    $(piece).attr('data-location', `${destination[0].dataset.id}`);
    destination.append(piece);
  };

  const resetBoard = () => {
    $($gameBoard).remove();
    createBoard();
    createChessPieces();
  }

  // Boilerplate Function Invocations
  createBoard();
  createChessPieces();
});