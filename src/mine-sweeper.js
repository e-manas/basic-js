const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (matrix[row][col] === true) {
        result[row][col] = 1;
      } else {
        let mineCount = 0;
        for (let [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;

          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (matrix[newRow][newCol] === true) {
              mineCount += 1;
            }
          }
        }

        result[row][col] = mineCount;
      }
    }
  }

  return result;
}

module.exports = {
  minesweeper
};
