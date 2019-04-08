$(document).ready(() => {
  // JQ Selectors
  let 
    $gameArea = $('.game-area'),
    $messageBox = $('.message-box'),
    $gameBoard,
    $boardSq,
    $piece,
    $destinationSquare;

  let movesArr = [];
  let playerTurn = 'white';
  
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

      // Piece Selection
      if (e.target.className.split(' ').indexOf('piece') > -1 && 
        movesArr.length === 0 &&
        e.target.dataset.color === playerTurn) 
      {
        // console.log('Piece Selected: ', e.target.id);
        $piece = $(`#${e.target.id}`);
        movesArr.push($piece);
        // Piece selection visual feedback
        $($piece).css({'border': '5px solid green'});
      }
      
      if (movesArr.length === 1 && e.target.className.split(' ').indexOf('piece') > -1 && e.target.dataset.color === playerTurn) {
        $($piece).css({'border': 'none'});
        $piece = $(`#${e.target.id}`);
        movesArr[0] = $piece;
        $($piece).css({'border': '5px solid green'});
      }

      // Square Selection
      if (e.target.className.split(' ').indexOf('board-square') > -1 &&
        movesArr.length === 1 &&
        // Piece can't move to it's own square
        e.target.dataset.id !== $piece[0].dataset.location) 
      {
        $destinationSquare = $(`#${e.target.id}`)
        movesArr.push($destinationSquare);

        movePiece(...movesArr);

        movesArr = [];
      };

      // Failsafe
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
        $($boardSq[i]).append(`
          <div 
          class="piece piece-black pawn black-pawn" 
          data-color="black" 
          data-piece-type="pawn" 
          data-location="${col}${row}" 
          id="pawn-${col}${row}">
            BP
          </div>`);
      } else if (row === 2) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white pawn white-pawn" 
          data-color="white" 
          data-piece-type="pawn" 
          data-location="${col}${row}" 
          id="pawn-${col}${row}">
            WP
          </div>`);
      }

      // Place Kings
      if (row === 8 && col === 'e') {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-black king black-king" 
          data-color="black" 
          data-piece-type="king" 
          data-location="${col}${row}" 
          id="king-${col}${row}">
            BK
          </div>`);
      } else if (row === 1 && col === 'e') {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white king white-king" 
          data-color="white" 
          data-piece-type="king" 
          data-location="${col}${row}" 
          id="king-${col}${row}">
            WK
          </div>`);
      }

      // Place Queens
      if (row === 8 && col === 'd') {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-black queen black-queen" 
          data-color="black" 
          data-piece-type="queen" 
          data-location="${col}${row}" 
          id="queen-${col}${row}">
            BQ
          </div>`);
      } else if (row === 1 && col === 'd') {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white queen white-queen" 
          data-color="white" 
          data-piece-type="queen" 
          data-location="${col}${row}" 
          id="queen-${col}${row}">
            WQ
          </div>`);
      }

      // Place Bishops
      if (row === 8 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-black bishop black-bishop" 
          data-color="black" 
          data-piece-type="bishop" 
          data-location="${col}${row}" 
          id="bishop-${col}${row}">
            BB
          </div>`);
      } else if (row === 1 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white bishop white-bishop" 
          data-color="white" 
          data-piece-type="bishop" 
          data-location="${col}${row}" 
          id="bishop-${col}${row}">
            WB
          </div>`);
      }     

      // Place Knights
      if (row === 8 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-black knight black-knight" 
          data-color="black" 
          data-piece-type="knight" 
          data-location="${col}${row}" 
          id="knight-${col}${row}">
            BK
          </div>`);
      } else if (row === 1 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white knight white-knight" 
          data-color="white" 
          data-piece-type="knight" 
          data-location="${col}${row}" 
          id="knight-${col}${row}">
            WK
          </div>`);
      }    

      // Place Rooks
      if (row === 8 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-black rook black-rook" 
          data-color="black" 
          data-piece-type="rook" 
          data-location="${col}${row}" 
          id="rook-${col}${row}">
            BR
          </div>`);
      } else if (row === 1 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white rook white-rook" 
          data-color="white" 
          data-piece-type="rook" 
          data-location="${col}${row}" 
          id="rook-${col}${row}">
            WR
          </div>`);
      }    
    }
  };

  const updateMsgBox = (msg) => {
    $($messageBox).text(msg);
  };

  const movePiece = (piece, destination) => {
    // console.log('movePiece() called! Args: ', piece, destination);
    $(piece).attr('data-location', `${destination[0].dataset.id}`);
    $(piece).css({ 'border': 'none' });
    destination.append(piece);
    if (playerTurn === 'white') {
      playerTurn = 'black';
      updateMsgBox(`Black's move`)
    } else {
      playerTurn = 'white';
      updateMsgBox(`White's move`);
    }
  };

  const resetBoard = () => {
    $($gameBoard).remove();
    createBoard();
    createChessPieces();
    movesArr = [];
    playerTurn = 'white';
    updateMsgBox(`White's move`);
  }
  
  // Boilerplate Function Invocations
  createBoard();
  createChessPieces();
  updateMsgBox(`White's move`);
});