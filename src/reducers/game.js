import {
  START_GAME,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
  ROTATE_DOWN,
  ROTATE_UP
} from '../constants/actionTypes';

import {
  getInitialState,
  startGame,
  moveDown,
  moveLeft,
  moveRight,
  rotateDown,
  rotateUp,
} from './selectors';

export default function game(state = getInitialState(), action) {
  switch (action.type) {
    case START_GAME:
      return startGame(state, action);
    case MOVE_DOWN:
      return moveDown(state, action);
    case MOVE_LEFT:
        return moveLeft(state, action);
    case MOVE_RIGHT:
        return moveRight(state, action);
    case ROTATE_DOWN:
        return rotateDown(state, action);
    case ROTATE_UP:
        return rotateUp(state, action);
    default:
      return state;
  }
}
