const checkMove = {
  pawn: function (origin, destination, color) {
    console.log({
      origin,
      destination,
      color
    });

    // Forward Motion

    // Pawns can only move forward
    if (
      (color === 'white' &&
        parseInt(origin[1]) < parseInt(destination[1])) ||
      (color === 'black' &&
        parseInt(origin[1]) > parseInt(destination[1]))) {
      // If pawns are on their initial row, can move 2 spaces
      if (
        origin[0] === destination[0] &&
        ((
          color === 'white' &&
          parseInt(origin[1]) === 2 &&
          Math.abs(parseInt(origin[1]) - parseInt(destination[1])) <= 2)) || (
          color === 'black' &&
          parseInt(origin[1]) === 7 &&
          Math.abs(parseInt(origin[1]) - parseInt(destination[1])) <= 2
        )
      ) {
        return true;
        // If pawns are out of their initial row, can only move 1 space  
      } else if (
        origin[0] === destination[0] &&
        Math.abs(parseInt(origin[1]) - parseInt(destination[1])) === 1 &&
        ((color === 'white' &&
          parseInt(origin[1]) !== 2)) || (color === 'black' && parseInt(origin[1]) !== 7)) {
        return true;
      }
    }
  }
}