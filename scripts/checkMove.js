const checkMove = {
  pawn: function (origin, destination, color) {
    console.log({
      origin,
      destination,
      color
    });

    // Forward Motion

    // White-specific rules
    if (color === 'white') {
      // Pawns can only move forward
      if (parseInt(origin[1]) < parseInt(destination[1])) {
        // Pawns on initial row
        if (parseInt(origin[1]) === 2) {
          if (origin[0] === destination[0] &&
            Math.abs(parseInt(origin[1]) - parseInt(destination[1])) <= 2) {
            return true;
          }
          // Pawns beyond initial row
        } else {
          if (origin[0] === destination[0] &&
            Math.abs(parseInt(origin[1]) - parseInt(destination[1])) <= 1) {
            return true;
          }
        }
      }
      // Black-specific rules
    } else if (color === 'black') {
      // Pawns can only move forward
      if (parseInt(origin[1]) > parseInt(destination[1])) {
        // Pawns on initial row
        if (parseInt(origin[1]) === 7) {
          if (origin[0] === destination[0] && Math.abs(parseInt(origin[1]) - parseInt(destination[1])) <= 2) {
            return true;
          }
          // Pawns beyond initial row
        } else {
          if (origin[0] === destination[0] && Math.abs(parseInt(origin[1]) - parseInt(destination[1])) <= 1) {
            return true;
          }
        }
      }
    }

    // ATTAAAACK
  },

  king: function () {},
  queen: function () {},
  bishop: function () {},
  knight: function () {},
  rook: function () {},
}