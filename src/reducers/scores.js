import {
  FETCH_SCORES_REQUEST,
  FETCH_SCORES_SUCCESS,
  FETCH_SCORES_ERROR,
  SEND_SCORE_SUCCESS,
  SEND_SCORE_ERROR,
} from '../constants/actionTypes';

export default function scores(state = {
  scores: [],
  isFetching: false,
  error: {}
}, action) {
  switch (action.type) {
    case FETCH_SCORES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_SCORES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        scores: action.scores
      });
    case FETCH_SCORES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        scores: [],
        error: action.error
      });
    case SEND_SCORE_SUCCESS:
      return Object.assign({}, state, {

      });
    case SEND_SCORE_ERROR:
      return Object.assign({}, state, {

      });
    default:
      return state;
  }
}
