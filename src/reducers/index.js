import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import game from './game';

export default combineReducers({
  routing: routerReducer,
  game
});
