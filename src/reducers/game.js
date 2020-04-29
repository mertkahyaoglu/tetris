import {
  START_GAME,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
  ROTATE_DOWN,
  ROTATE_UP,
  GAME_OVER,
  RESET_GAME_STATE,
} from "../constants/actionTypes";

import {
  getInitialState,
  startGame,
  moveDown,
  moveLeft,
  moveRight,
  rotateDown,
  rotateUp,
  gameOver,
} from "./selectors";

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
    case GAME_OVER:
      return gameOver(state);
    case RESET_GAME_STATE:
      clearInterval(state.intervalID);
      return getInitialState();
    default:
      return state;
  }
}
