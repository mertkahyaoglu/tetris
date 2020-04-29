import { TICK } from "../constants/game";
import {
  START_GAME,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
  ROTATE_DOWN,
  ROTATE_UP,
  RESET_GAME_STATE,
} from "../constants/actionTypes";

export const startGame = () => {
  return (dispatch, getState) => {
    const intervalID = setInterval(() => {
      dispatch(moveDown());
    }, TICK);
    dispatch({
      type: START_GAME,
      intervalID,
    });
  };
};

export const moveDown = () => ({
  type: MOVE_DOWN,
});

export const moveRight = () => ({
  type: MOVE_RIGHT,
});

export const moveLeft = () => ({
  type: MOVE_LEFT,
});

export const rotateDown = () => ({
  type: ROTATE_DOWN,
});

export const rotateUp = () => ({
  type: ROTATE_UP,
});

export const resetGameState = () => ({
  type: RESET_GAME_STATE,
});
