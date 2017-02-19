import React, { PropTypes } from 'react';
import _ from 'underscore';

import Piece from './Piece';
import Row from './Row';
import { Piece as PieceSize } from '../constants/game';

const Tetromino = ({shape, color, position}) => {
  const rows = _.map(shape, (row, i) =>
    <Row key={i}>
      {
        _.map(row, (cell, j) =>
          <Piece key={`${i}${j}`} color={cell && color || ''} />
        )
      }
    </Row>
  );
  return (
    <div style={{
      position: position ? 'absolute' : 'static',
      top: position && position.y * PieceSize.height,
      left: position && position.x * PieceSize.width }}>
      {rows}
    </div>
  );
};

Tetromino.propTypes = {
  color: PropTypes.string.isRequired,
  shape: PropTypes.array.isRequired,
  position: PropTypes.object.isRequired
};

export default Tetromino;
