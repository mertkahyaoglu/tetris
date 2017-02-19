const cellAt = (board, x, y) => board[y] ? board[y][x] : undefined;

// check every cell in the next row
export const canMoveDown = (board, cells) =>
  cells.every(cell => cellAt(board, cell.x, cell.y + 1) === null);

// check every cell in the right column
export const canMoveRight = (board, cells) =>
  cells.every(cell => cellAt(board, cell.x + 1, cell.y) === null);

// check every cell in the left column
export const canMoveLeft = (board, cells) =>
  cells.every(cell => cellAt(board, cell.x - 1, cell.y) === null);

// check every cell surrounding
export const canRotate = (board, cells) =>
  cells.every(cell => cellAt(board, cell.x, cell.y) === null);
