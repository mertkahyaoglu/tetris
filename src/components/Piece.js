import React, { PropTypes } from 'react';

import { Piece as PieceSize } from '../constants/game';

const Piece = ({color}) =>
  <div style={{
      backgroundColor: color,
      width: PieceSize.width,
      height: PieceSize.height,
  }}/>;

Piece.propTypes = {
  color: PropTypes.string.isRequired
};

export default Piece;
