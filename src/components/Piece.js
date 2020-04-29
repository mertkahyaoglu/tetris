import React from "react";
import PropTypes from "prop-types";

import { Piece as PieceSize } from "../constants/game";

const Piece = ({ color }) => (
  <div
    style={{
      backgroundColor: color,
      width: PieceSize.width,
      height: PieceSize.height,
    }}
  />
);

Piece.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Piece;
