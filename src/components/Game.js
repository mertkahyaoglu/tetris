import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Keys from "../constants/keys";
import Board from "./Board";
import Tetromino from "./Tetromino";
import Popup from "./Popup";
import {
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  rotateDown,
  rotateUp,
  resetGameState,
} from "../actions/game";

class Game extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    this.props.resetGameState();
  }

  handleKeyDown = (e) => {
    const {
      game,
      moveDown,
      moveRight,
      moveLeft,
      rotateDown,
      rotateUp,
    } = this.props;
    if (game.started) {
      switch (e.keyCode) {
        case Keys.LEFT:
          return moveLeft();
        case Keys.RIGHT:
          return moveRight();
        case Keys.DOWN:
          return rotateDown();
        case Keys.UP:
          return rotateUp();
        case Keys.SPACE:
          return moveDown();
      }
    }
  }

  render() {
    const { startGame, game } = this.props;
    const {
      tetromino,
      board,
      rows,
      score,
      nextTetromino,
      started,
      gameOver,
    } = game;
    return (
      <div className="container">
        <div className="top">
          <h1 className={gameOver ? "error" : ""}>tetris</h1>
        </div>
        <div className="game">
          <Board board={board}>
            <Tetromino {...tetromino} />
          </Board>
          <Popup
            type={gameOver ? "gameover" : "start"}
            visible={!started}
            onStartClick={startGame}
            score={score}
          />
        </div>
        <div className="info">
          <ul className="game-info">
            <li className="next">
              next :
              <div className="next-tetromino">
                <Tetromino {...nextTetromino} />
              </div>
            </li>
            <li>score : {score}</li>
            <li>rows : {rows}</li>
          </ul>
          <ul className="control-info">
            <li>
              steer: <span>&larr;</span> , <span>&rarr;</span>
            </li>
            <li>
              rotate: <span>&uarr;</span> , <span>&darr;</span>
            </li>
            <li>
              down: <span>space</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  startGame: PropTypes.func.isRequired,
  moveDown: PropTypes.func.isRequired,
  moveLeft: PropTypes.func.isRequired,
  moveRight: PropTypes.func.isRequired,
  rotateDown: PropTypes.func.isRequired,
  rotateUp: PropTypes.func.isRequired,
  resetGameState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      startGame,
      moveDown,
      moveRight,
      moveLeft,
      rotateDown,
      rotateUp,
      resetGameState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);
