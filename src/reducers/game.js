import {
  START_GAME,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
  ROTATE_DOWN,
  ROTATE_UP
} from '../constants/actionTypes';


export default function game(state = {}, action) {
  switch (action.type) {
    case START_GAME:
    case MOVE_DOWN:
    case MOVE_LEFT:
    case MOVE_RIGHT:
    case ROTATE_DOWN:
    case ROTATE_UP:
    default:
      return state;
  }
}
