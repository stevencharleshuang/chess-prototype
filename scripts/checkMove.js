const checkMove = {
  pawn: function (origin, destination, color, target) {
    let 
      orgRowNum = parseInt(origin[1]),
      desRowNum = parseInt(destination[1]),
      orgColCharCode = origin.charCodeAt(0),
      desColCharCode = destination.charCodeAt(0);

    console.log({
      origin,
      destination,
      color,
      target,
      orgRowNum,
      desRowNum,
      orgColCharCode,
      desColCharCode
    });

    // Forward Motion
    if (target.dataset.type === 'square') {
      // If moving in the same column
      if (origin[0] === destination[0]) {
        // White-specific rules
        if (color === 'white') {
          // Pawns can only move forward
          if (orgRowNum < desRowNum) {
            // Pawns on initial row
            if (orgRowNum === 2) {
              if (origin[0] === destination[0] &&
                Math.abs(orgRowNum - desRowNum) <= 2) {
                // Check if pieces are in the way
                for (let i = desRowNum; i > orgRowNum; i -= 1) {
                  let $tempSq = $(`#board-square-${destination[0]}${i}`);

                  if ($tempSq[0].children.length > 0) {
                    return false;
                  }
                }
                return true;
              }
              // Pawns beyond initial row
            } else {
              if (origin[0] === destination[0] &&
                Math.abs(orgRowNum - desRowNum) <= 1) {
                return true;
              }
            }
          }
        // Black-specific rules
        } else if (color === 'black') {
          // Pawns can only move forward
          if (orgRowNum > desRowNum) {
            // Pawns on initial row
            if (orgRowNum === 7) {
              if (
                origin[0] === destination[0] && 
                Math.abs(orgRowNum - desRowNum) <= 2) {
                // Check if pieces are in the way
                for (let i = desRowNum; i < orgRowNum; i += 1) {
                  let $tempSq = $(`#board-square-${destination[0]}${i}`);

                  if ($tempSq[0].children.length > 0) {
                    return false;
                  }
                }
                return true;
              }
              // Pawns beyond initial row
            } else {
              if (
                origin[0] === destination[0] && 
                Math.abs(orgRowNum - desRowNum) <= 1) {
                return true;
              }
            }
          }
        }
      }
    } else {
      // ATTAAAACK
      if (
        target.dataset.type === 'piece' && 
        target.dataset.color !== color &&
        Math.abs(orgRowNum - desRowNum) === 1 &&
        Math.abs(orgColCharCode - desColCharCode) === 1) {
          console.log('>>>>> Attack!!', {target});
          return true;
      } else {
        return false;
      }
      // ToDo: implement En Passant
    }
  },

  king: function () {},
  queen: function () {},

  bishop: function (origin, destination, color, target) {
    if (target.dataset.type === 'square') {
      console.log('Bishop to type Square');
      if (origin[0] !== destination[0] && origin[1] !== destination[1]) {
        // Moving Left
        if (origin.charCodeAt(0) > destination.charCodeAt(0)) {
          console.log(
            'bishop heading left', 
            origin.charCodeAt(0), 
            destination.charCodeAt(0));
          // Diagonal path must be linear
          if (
            Math.abs(
              parseInt(
                origin.charCodeAt(0)) - 
              parseInt(
                destination.charCodeAt(0))) % 2 <= 1) {
            // Check if there are pieces in the way
            // moving upward
            if (parseInt(origin[1]) < parseInt(destination[1])) {
              console.log ('diagonal linear motion checked');
              for (
                let i = origin.charCodeAt(0) - 1; 
                i > destination.charCodeAt(0); 
                i -= 1) {

                for (
                  let j = parseInt(origin[1]) + 1; 
                  j < parseInt(destination[1]); 
                  j += 1) {

                  let $tempSq = $(`#board-square-${String.fromCharCode(i)}${j}`);
                  console.log({$tempSq});
                  if ($tempSq[0].children.length < 1) {
                    return true;
                  } else if ($tempSq[0].children.length >= 1) {                
                    return false;
                  }
                }
              }
              return true
            // moving downward
            } else if (parseInt(origin[1]) > parseInt(destination[1])) {
              console.log('moving down');
              for (
                let i = origin.charCodeAt(0) - 1; 
                i > destination.charCodeAt(0); 
                i -= 1) {

                for (
                  let j = parseInt(origin[1]) - 1; 
                  j > parseInt(destination[1]); 
                  j += 1) {

                  let $tempSq = $(`#board-square-${String.fromCharCode(i)}${j}`);
                  console.log({$tempSq});
                  if ($tempSq[0].children.length < 1) {
                    return true;
                  }
                }
              }
            }
          }
        // Moving Right
        } else if (origin.charCodeAt(0) < destination.charCodeAt(0)) {
            console.log(
              'bishop heading right', 
              origin.charCodeAt(0), 
              destination.charCodeAt(0));
            // Diagonal path must be linear
            if (
              Math.abs(
                parseInt(origin.charCodeAt(0)) - 
                parseInt(destination.charCodeAt(0))) % 2 <= 1) {
              // Check if there are pieces in the way
              // moving upward
              if (parseInt(origin[1]) < parseInt(destination[1])) {
                console.log ('diagonal linear motion checked');
                for (
                  let i = origin.charCodeAt(0) - 1; 
                  i > destination.charCodeAt(0); 
                  i -= 1) {

                  for (
                    let j = parseInt(origin[1]) + 1; 
                    j < parseInt(destination[1]); 
                    j += 1) {

                    let $tempSq = $(`#board-square-${String.fromCharCode(i)}${j}`);
                    console.log({$tempSq});
                    if ($tempSq[0].children.length < 1) {
                      return true;
                    } else if ($tempSq[0].children.length >= 1) {                
                      return false;
                    }
                  }
                }
                return true
              // moving downward
              } else if (parseInt(origin[1]) > parseInt(destination[1])) {
                console.log('moving down');
                for (
                  let i = origin.charCodeAt(0) - 1; 
                  i > destination.charCodeAt(0); 
                  i -= 1) {

                  for (
                    let j = parseInt(origin[1]) - 1; 
                    j > parseInt(destination[1]); 
                    j += 1) {

                    let $tempSq = $(`#board-square-${String.fromCharCode(i)}${j}`);
                    console.log({$tempSq});
                    if ($tempSq[0].children.length < 1) {
                      return true;
                    }
                  }
                }
              }
            }
        }
      }
    } 
    else if (target.dataset.type === 'piece') {
      console.log('>>>>> Attack!!', {target});
    }
  },

  knight: function () {},
  rook: function () {},
}