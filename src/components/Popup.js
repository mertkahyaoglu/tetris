import React, { Component, PropTypes }  from 'react';

class Popup extends Component {

  constructor(){
    super();
    this.state = {sent: false};
  }

  handleSendClick() {
    const username = this.refs.username.value;
    if (username) {
      this.props.onSendClick(username);
      this.setState({sent: true});
    }
  }

  handleStartClick() {
    this.props.onStartClick();
    this.setState({sent: false});
  }

  render() {
    const { type, visible, onStartClick } = this.props;

    if (!visible) {
      return null;
    }

    let node = null;
    if (type == 'start') {
      node = <button onClick={() => this.handleStartClick()}>start game</button>;
    } else if (type == 'gameover') {
      node = (<div className="gameover-popup">
        {
          this.state.sent &&
            <button onClick={() => this.handleStartClick()}>Start Game</button>
        }
        {
          !this.state.sent && <div>
            <h3>Game Over</h3>
            <p>Send your score!</p>
            <input ref="username" type="text" placeholder="Your username" />
            <button onClick={() => this.handleSendClick()}>send</button>
          </div>
        }
      </div>);
    }

    return (
      <div className="popup">
        {node}
      </div>
    );
  }
}

Popup.propTypes = {
  type: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onSendClick: PropTypes.func.isRequired,
};

export default Popup;
