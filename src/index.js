/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import './styles.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

import Game from './components/Game';
import Scores from './components/Scores';

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Game}/>
      <Route path="scores" component={Scores}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
