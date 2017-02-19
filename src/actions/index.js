import { TICK } from '../constants/game';
import {
  START_GAME,
  MOVE_DOWN,
  MOVE_RIGHT,
  MOVE_LEFT,
  ROTATE_DOWN,
  ROTATE_UP,
  GAME_OVER,
  FETCH_SCORES_REQUEST,
  FETCH_SCORES_SUCCESS,
  FETCH_SCORES_ERROR
} from '../constants/actionTypes';

export const startGame = () => {
  return (dispatch, getState) => {
    const intervalID = setInterval(() => {
      dispatch(moveDown());
    }, TICK);
    dispatch({
      type: START_GAME,
      intervalID
    });
  };
};

export const gameOver = () => ({
  type: GAME_OVER
});


export const fetchScores = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_SCORES_REQUEST });
    return fetch('')
      .then(res => res.json())
      .then(scores => dispatch({
        type: FETCH_SCORES_SUCCESS,
        scores
      }))
      .catch(error => dispatch({
        type: FETCH_SCORES_ERROR,
        error
      }));
  };
};

export const moveDown = () => ({
  type: MOVE_DOWN
});

export const moveRight = () => ({
  type: MOVE_RIGHT
});

export const moveLeft = () => ({
  type: MOVE_LEFT
});

export const rotateDown = () => ({
  type: ROTATE_DOWN
});

export const rotateUp = () => ({
  type: ROTATE_UP
});
