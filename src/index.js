/* eslint-disable import/default */
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Game from "./components/Game";
import "./styles.scss";

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
);
