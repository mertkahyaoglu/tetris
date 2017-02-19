/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Game from './components/Game';
import './styles.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
