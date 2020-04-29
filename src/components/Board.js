import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";

import Piece from "./Piece";
import { Board as BoardSize, Piece as PieceSize } from "../constants/game";

const Board = ({ children, board }) => {
  const pieces = [];
  _.each(board, (row, i) => {
    _.each(row, (piece, j) => {
      if (piece === null) return;
      pieces.push(
        <div
          key={`${i}${j}`}
          style={{
            position: "absolute",
            top: i * PieceSize.height,
            left: j * PieceSize.width,
          }}
        >
          <Piece color={piece} />
        </div>
      );
    });
  });

  return (
    <div
      className="board"
      style={{
        width: PieceSize.width * BoardSize.width,
        height: PieceSize.height * BoardSize.height,
      }}
    >
      {pieces}
      {children}
    </div>
  );
};

Board.propTypes = {
  children: PropTypes.element,
  board: PropTypes.array.isRequired,
};

export default Board;
