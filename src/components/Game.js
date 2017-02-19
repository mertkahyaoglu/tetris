import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Keys from '../constants/keys';
import Board from './Board';
import Tetromino from './Tetromino';
import {
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  rotateDown,
  rotateUp,
} from '../actions';

class Game extends Component {

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentDidMount() {
    this.props.startGame();
  }

  componentWillReceiveProps(prevProps, prevState) {
    if (prevProps.game.gameOver !== this.props.game.gameOver) {
      // show modal
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    const {
      game, moveDown, moveRight, moveLeft, rotateDown, rotateUp
    } = this.props;
    if (!game.gameOver) {
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
    const { tetromino, board, rows, score, nextTetromino } = this.props.game;
    return (
      <div className="container">
        <div className="top">
          <h1>tetris</h1>
          <ul>
            <li>game</li>
            <li>ranks</li>
          </ul>
        </div>
        <div className="game">
          <Board board={board}>
            <Tetromino {...tetromino} />
          </Board>
        </div>
        <div className="info">
          <ul>
            <li className="next">next :
              <div className="next-tetromino">
                <Tetromino {...nextTetromino} />
              </div>
            </li>
            <li>score : {score}</li>
            <li>rows : {rows}</li>
          </ul>
          <hr/>
          <ul>
            <li>steer: <span>&larr;</span> , <span>&rarr;</span></li>
            <li>rotate: <span>&uarr;</span> , <span>&darr;</span></li>
            <li>down: <span>space</span></li>
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
};

const mapStateToProps = (state) => ({
  game: state.game
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  rotateDown,
  rotateUp
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
