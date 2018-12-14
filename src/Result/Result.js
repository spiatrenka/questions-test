import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Result extends PureComponent {
  static propTypes = {
    correctAnswers: PropTypes.number,
    totalAnswers: PropTypes.number,
  }

  static defaultProps = {
    correctAnswers: 0,
    totalAnswers: 0,
  }

  render() {
    const { totalAnswers, correctAnswers } = this.props;

    return (
      <div>
        <div>Total answers: {totalAnswers}</div>
        <div>Correct answers: {correctAnswers}</div>
      </div>
    )
  }
}

export default Result;
