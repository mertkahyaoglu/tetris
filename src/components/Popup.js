import React from "react";
import PropTypes from "prop-types";

function Popup({ type, score, visible, onStartClick }) {
  if (!visible) {
    return null;
  }

  let node = null;
  if (type == "start") {
    node = <button onClick={onStartClick}>start game</button>;
  } else if (type == "gameover") {
    node = (
      <div className="gameover-popup">
        <h3>Game Over</h3>
        <h5>Score: {score}</h5>
        <button onClick={onStartClick}>Start Game</button>
      </div>
    );
  }

  return <div className="popup">{node}</div>;
}

Popup.propTypes = {
  type: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
};

export default Popup;
