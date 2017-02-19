import _ from 'underscore';
import cloneDeep from 'lodash/cloneDeep';

import { Board, POINTS } from '../constants/game';
import {
  shuffleTetrominos,
  getTetrominoCells,
  getCurrentTetrominoCells,
  transpose,
  rtranspose
} from '../utils/helpers';
import {
  canMoveDown,
  canMoveRight,
  canMoveLeft,
  canRotate
} from '../utils/movable';

// returns resetted state
export const getInitialState = () => {
  const tetrominos = shuffleTetrominos();
  const tetromino = tetrominos.shift();
  return {
    tetromino,
    nextTetromino: _.first(tetrominos),
    tetrominos,
    board: _.times(Board.height, () => _.times(Board.width, () => null)),
    intervalID: null,
    score: 0,
    rows: 0,
    gameOver: false
  };
};

// returns game start state
export const startGame = (state, action) => {
  if (state.intervalID) {
    clearInterval(state.intervalID);
  }
  return {
    ...getInitialState(),
    intervalID: action.intervalID
  };
};

// returns state with the newly positioned tetromino
function spawnTetromino(state) {
  const newState = cloneDeep(state);
  const cells = getCurrentTetrominoCells(newState);
  _.each(cells, cell => {
    newState.board[cell.y][cell.x] = newState.tetromino.color;
  });
  return newState;
}

// updates score and deletes full rows
function updateScore(state) {
  const newState = cloneDeep(state);
  const board = newState.board.filter(row => row.some(cell => cell === null));
  newState.board = board;
  const numDelRows = Board.height - board.length;
  newState.score += POINTS * numDelRows;
  newState.rows += numDelRows;
  Array.prototype.unshift.apply(board,
    _.times(numDelRows, () => _.times(Board.width, () => null))
  );
  return newState;
}

export const moveDown = (state, action) => {
  let newState = cloneDeep(state);
  if (canMoveDown(state.board, getCurrentTetrominoCells(state))) {
    // move down
    newState.tetromino.position = {
      y: state.tetromino.position.y + 1,
      x: state.tetromino.position.x
    };
  } else if (newState.tetromino.position.y === 0) {
    // reach to top, game over
    clearInterval(newState.intervalID);
    newState.gameOver = true;
  } else {
    // hit the bottom, generate new one
    newState = spawnTetromino(newState);
    newState = updateScore(newState);
    // generate new shuffle if remains 1 tetromino
    if (newState.tetrominos.length === 1) {
      newState.tetrominos = shuffleTetrominos();
    }
    newState.tetromino = newState.nextTetromino;
    newState.tetrominos = _.rest(newState.tetrominos);
    newState.nextTetromino = _.first(newState.tetrominos);
  }
  return newState;
};

export const moveLeft = (state, action) => {
  const newState = cloneDeep(state);
  if (canMoveLeft(state.board, getCurrentTetrominoCells(state))) {
    newState.tetromino.position = {
      y: state.tetromino.position.y,
      x: state.tetromino.position.x - 1
    };
  }
  return newState;
};

export const moveRight = (state, action) => {
  const newState = cloneDeep(state);
  if (canMoveRight(state.board, getCurrentTetrominoCells(state))) {
    newState.tetromino.position = {
      y: state.tetromino.position.y,
      x: state.tetromino.position.x + 1
    };
  }
  return newState;
};

export const rotateDown = (state, action) => {
  const newState = cloneDeep(state);
  const { shape, position } = newState.tetromino;
  const rotated = transpose(shape);
  if (canRotate(state.board, getTetrominoCells(rotated, position))) {
    newState.tetromino.shape = rotated;
  }
  return newState;
};

export const rotateUp = (state, action) => {
  const newState = cloneDeep(state);
  const { shape, position } = newState.tetromino;
  const rotated = rtranspose(shape);
  if (canRotate(state.board, getTetrominoCells(rotated, position))) {
    newState.tetromino.shape = rotated;
  }
  return newState;
};
