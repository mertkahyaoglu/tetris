import _ from "underscore";
import Tetrominos from "../constants/tetrominos";

// shuffles tetrominos and returns array of info object
export const shuffleTetrominos = () => {
  return _.chain(Tetrominos)
    .keys()
    .shuffle()
    .map((key) => ({
      shape: Tetrominos[key].shape,
      color: Tetrominos[key].color,
      position: { x: 6, y: 0 },
    }))
    .value();
};

// returns coordinates of cells of a tetromino
export const getTetrominoCells = (shape, position) => {
  const cells = [];
  _.each(shape, (row, i) => {
    _.each(row, (col, j) => {
      if (col == 1) {
        cells.push({
          x: j + position.x,
          y: i + position.y,
        });
      }
    });
  });
  return cells;
};

export const getCurrentTetrominoCells = (state) => {
  const { shape, position } = state.tetromino;
  return getTetrominoCells(shape, position);
};

export const transpose = (matrix) => {
  return _.zip.apply(null, matrix).map((row) => row.reverse());
};

export const rtranspose = (matrix) => {
  const reverse = _.map(matrix, (row) => row.reverse());
  return _.map(reverse[0], (col, i) => {
    return _.map(reverse, (row) => row[i]);
  });
};
