import {
  FETCH_SCORES_REQUEST,
  FETCH_SCORES_SUCCESS,
  FETCH_SCORES_ERROR,
  SEND_SCORE_SUCCESS,
  SEND_SCORE_ERROR
} from '../constants/actionTypes';

export const fetchScores = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_SCORES_REQUEST });
    return fetch('http://127.0.0.1:5000/tetris/scores')
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

export const sendScore = (username) => {
  return (dispatch, getState) => {
    const score = getState().game.score;
    return fetch('http://127.0.0.1:5000/tetris/save_score', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score, username })
      })
      .then(res => res.json())
      .then(score => dispatch({
        type: SEND_SCORE_SUCCESS
      }))
      .catch(error => dispatch({
        type: SEND_SCORE_ERROR,
        error
      }));
  };
};
