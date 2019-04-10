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
            data-type="square" 
            data-location="${String.fromCharCode(alphaNum)}${numNum}"
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
            data-type="square" 
            data-location="${String.fromCharCode(alphaNum)}${numNum}"
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
    $($boardSq).on('click', handleMoves);
    $('.piece').on('click', handleMoves);
  };
  
  const handleMoves = (e) => {
    // console.log(e);
    let 
      target = e.target;
      targetData = e.target.dataset;

    // Handle Primary Selection (piece)
    if (targetData.type === 'piece' &&
      movesArr.length === 0 &&
      e.target.dataset.color === playerTurn) {
      // console.log('Piece Selected: ', e.target.id);
      $piece = $(`#${e.target.id}`);
      movesArr.push($piece);
      // Piece selection visual feedback
      $($piece).css({
        'border': '5px solid green'
      });
      // Allows player to change the piece that they want to move
    } else if (movesArr.length === 1 &&
      targetData.type === 'piece' &&
      targetData.color === playerTurn) {
      $($piece).css({
        'border': 'none'
      });
      $piece = $(`#${target.id}`);
      movesArr[0] = $piece;
      $($piece).css({
        'border': '5px solid green'
      });
    }
  
    // Handle Secondary Selection (square or piece)
    else if (movesArr.length === 1 && 
      (e.target.dataset.type === 'square' ||
        e.target.dataset.type === 'piece') &&
      // Piece can't move to it's own square
      e.target.dataset.id !== $piece[0].dataset.location) {

      let moveIsLegal = false;
  
      switch ($piece[0].dataset.piece) {
        case 'pawn':
          console.log('moved a pawn', e);
          moveIsLegal =
            checkMove.pawn(
              $piece[0].dataset.location,
              targetData.location,
              $piece[0].dataset.color,
              e.currentTarget.firstElementChild
            );
          break;
        case 'king':
          console.log('moved the king');
          break;
        case 'queen':
          console.log('moved the queen');
          break;
        case 'bishop':
          console.log('moved a bishop');
          break;
        case 'knight':
          console.log('moved a knight');
          break;
        case 'rook':
          console.log('moved a rook');
          break;
        default:
          break;
      };
  
      $destinationSquare = $(`#board-square-${targetData.location}`);
  
      if (moveIsLegal) {
        movesArr.push($destinationSquare);
        movePiece(...movesArr);
      } else {
        updateMsgBox('Move is illegal', true);
      }
  
      $($piece).css({
        'border': 'none'
      });
      movesArr = [];
    };
  
    // Failsafe
    if (movesArr.length > 2) {
      movesArr = [];
    }
  }
  
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
          data-type="piece" 
          data-piece="pawn" 
          data-location="${col}${row}" 
          id="pawn-${col}${row}">
            BP
          </div>`);
      } else if (row === 2) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white pawn white-pawn" 
          data-color="white" 
          data-type="piece" 
          data-piece="pawn" 
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
          data-type="piece" 
          data-piece="king" 
          data-location="${col}${row}" 
          id="king-${col}${row}">
            BK
          </div>`);
      } else if (row === 1 && col === 'e') {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white king white-king" 
          data-color="white" 
          data-type="piece" 
          data-piece="king" 
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
          data-type="piece" 
          data-piece="queen" 
          data-location="${col}${row}" 
          id="queen-${col}${row}">
            BQ
          </div>`);
      } else if (row === 1 && col === 'd') {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white queen white-queen" 
          data-color="white" 
          data-type="piece" 
          data-piece="queen" 
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
          data-type="piece" 
          data-piece="bishop" 
          data-location="${col}${row}" 
          id="bishop-${col}${row}">
            BB
          </div>`);
      } else if (row === 1 && (col === 'c' || col === 'f')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white bishop white-bishop" 
          data-color="white" 
          data-type="piece" 
          data-piece="bishop" 
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
          data-type="piece" 
          data-piece="knight" 
          data-location="${col}${row}" 
          id="knight-${col}${row}">
            BK
          </div>`);
      } else if (row === 1 && (col === 'b' || col === 'g')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white knight white-knight" 
          data-color="white" 
          data-type="piece" 
          data-piece="knight" 
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
          data-type="piece" 
          data-piece="rook" 
          data-location="${col}${row}" 
          id="rook-${col}${row}">
            BR
          </div>`);
      } else if (row === 1 && (col === 'a' || col === 'h')) {
        $($boardSq[i]).append(`
          <div 
          class="piece piece-white rook white-rook" 
          data-color="white" 
          data-type="piece" 
          data-piece="rook" 
          data-location="${col}${row}" 
          id="rook-${col}${row}">
            WR
          </div>`);
      }    
    }
  };

  const updateMsgBox = (msg, temporary = false) => {
    let $previousMsg = $($messageBox).text();
    if (temporary) {
      $($messageBox).text(msg);
      setTimeout(() => $($messageBox).text($previousMsg), 1000);
    } else {
      $($messageBox).text(msg);
    }
  };

  const movePiece = (piece, destination) => {
    // console.log('movePiece() called! Args: ', piece, destination);
    if (destination[0].firstElementChild === null) {
      // console.log('Regular Move Executed');
      $(piece).attr('data-location', `${destination[0].dataset.location}`);
      $(piece).css({ 'border': 'none' });
      destination.append(piece);
    } else {
      let $currentSq = $(`#board-square-${destination[0].dataset.location}`);
      // console.log('Attack Move Executed', $currentSq);
      $(destination[0].firstElementChild).remove();
      $(piece).attr('data-location', `${destination[0].dataset.location}`);
      $($currentSq).append(piece);
    }
    if (playerTurn === 'white') {
      playerTurn = 'black';
      updateMsgBox(`Black's move`);
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

