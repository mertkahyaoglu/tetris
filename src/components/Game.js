import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import Keys from '../constants/keys';
import Board from './Board';
import Tetromino from './Tetromino';
import Popup from './Popup';
import { sendScore } from '../actions/scores';
import {
  startGame,
  moveDown,
  moveRight,
  moveLeft,
  rotateDown,
  rotateUp,
  resetGameState
} from '../actions/game';

class Game extends Component {

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.props.resetGameState();
  }

  handleKeyDown(e) {
    const {
      game, moveDown, moveRight, moveLeft, rotateDown, rotateUp
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
    const { startGame, sendScore, game } = this.props;
    const { tetromino, board, rows, score, nextTetromino, started, gameOver } = game;
    return (
      <div className="container">
        <div className="top">
          <h1 className={gameOver ? 'error' : ''}>tetris</h1>
          <ul>
            <li><Link to="/">game</Link></li>
            <li><Link to="/scores">top scores</Link></li>
          </ul>
        </div>
        <div className="game">
          <Board board={board}>
            <Tetromino {...tetromino} />
          </Board>
          <Popup
            type={gameOver ? 'gameover' : 'start'}
            visible={!started}
            onStartClick={startGame}
            onSendClick={sendScore} />
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
  sendScore: PropTypes.func.isRequired,
  resetGameState: PropTypes.func.isRequired,
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
  rotateUp,
  sendScore,
  resetGameState
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
