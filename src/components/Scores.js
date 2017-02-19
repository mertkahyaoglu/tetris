import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'underscore';

import { fetchScores } from '../actions';

class Scores extends Component {

  componentDidMount() {
    this.props.fetchScores();
  }

  render() {
    const { scores, isFetching, error } = this.props;

    let children;
    if (isFetching) {
      children = 'Loading...';
    } else if (scores.length) {
      children = _.map(scores, (score, i) =>
        <li key={i}>{score.username}: <strong>{score.score}</strong></li>
      );
    } else if (scores.length == 0) {
      children = 'Be the first one!';
    } else {
      children = 'Error occured.';
    }

    return (
      <div className="container">
        <div className="top">
          <h1>tetris</h1>
          <ul>
            <li><Link to="/">game</Link></li>
            <li><Link to="/scores">top scores</Link></li>
          </ul>
        </div>
        <div className="scoreboard">
          <ul>
            {children}
          </ul>
        </div>
      </div>
    );
  }
}

Scores.propTypes = {
  scores: PropTypes.array.isRequired,
  fetchScores: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = (state) => ({
  scores: state.scores.scores,
  isFetching: state.scores.isFetching,
  error: state.scores.error
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchScores
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Scores);
