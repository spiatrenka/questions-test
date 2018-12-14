import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio } from 'antd';

const RadioGroup = Radio.Group;

class Question extends PureComponent {
  static propTypes: {
    question: PropTypes.shape,
    onChangeAnswer: PropTypes.func,
    onSubmitQuestion: PropTypes.func,
  }

  state = {
    chosenAnswer: null,
  }

  onChangeAnswer = (e) => {
    const answer = e.target.value;

    this.setState({
      chosenAnswer: answer,
    });

    const { onChangeAnswer } = this.props;
    onChangeAnswer(e);
  }

  submitQuestion = (e) => {
    const { onSubmitQuestion } = this.props;

    onSubmitQuestion(e);
  }

  render() {
    const { question } = this.props;
    const { chosenAnswer } = this.state;

    return (
      <div>
        <div>{question.text}</div>
        <RadioGroup onChange={this.onChangeAnswer} value={chosenAnswer}>
          {question.answers.map(answer => (
            <Radio value={answer.id} key={answer.id}>
              {answer.text}
            </Radio>
          ))}
        </RadioGroup>
        <Button onClick={this.submitQuestion}>Next</Button>
      </div>
    );
  }
}

export default Question;
