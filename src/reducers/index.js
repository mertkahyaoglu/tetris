import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import game from './game';
import scores from './scores';

export default combineReducers({
  routing: routerReducer,
  game,
  scores
});
