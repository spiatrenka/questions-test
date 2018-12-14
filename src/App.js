import React, { Component } from 'react';
import { Button } from 'antd';

import './App.css';
import { questions } from './questions';
import Question from './Question';
import Result from './Result';

class App extends Component {
  state = {
    currentQuestion: null,
    availableQuestions: [],
    currentAnswers: [],
    answeredQuestions: [],
    totalAnswers: 0,
    correctAnswers: 0,
    resultReady: false,
  }

  start = () => {
    this.clearAnsweredQuestions();
    this.clearResult();
    this.resetAvailableQuestions();
  }

  resetAvailableQuestions = () => {
    this.setState({
      availableQuestions: questions.slice(),
    }, this.setCurrentQuestion)
  }

  clearAnsweredQuestions = () => {
    this.setState({
      answeredQuestions: [],
    })
  }

  clearResult = () => {
    this.setState({
      totalAnswers: 0,
      correctAnswers: 0,
      resultReady: false,
    })
  }

  setCurrentQuestion = () => {
    const { availableQuestions } = this.state;

    this.setState({
      currentQuestion: availableQuestions.shift(),
      availableQuestions,
    })
  }

  onChangeAnswer = (e) => {
    const { currentAnswers } = this.state;
    const answer = e.target.value;
    currentAnswers.push(answer);

    this.setState({
      currentAnswers,
    });
  }

  submitQuestion = () => {
    this.checkAnswer();
    this.clearCurrentAnswers();
    if (this.checkLastQuestion()) {
      this.getResults();
    }
    this.setCurrentQuestion();
  }

  checkAnswer = () => {
    const { currentQuestion, currentAnswers, answeredQuestions } = this.state;

    const correctAnswers = currentQuestion.answers.filter(answer => answer.correct).map(answer => answer.id);
    const correct = correctAnswers.every( answerId => currentAnswers.includes(answerId));
    const answeredQuestion = {
      id: currentQuestion.id,
      answers: currentAnswers,
      correct,
    };

    answeredQuestions.push(answeredQuestion);
    this.setState({
      answeredQuestions,
    });
  }

  clearCurrentAnswers = () => {
    this.setState({
      currentAnswers: [],
    });
  }

  getResults = () => {
    const { answeredQuestions } = this.state;

    const totalAnswers = answeredQuestions.length;
    const reducer = (accumulator, currentElement) => accumulator + (currentElement.correct ? 1 : 0);
    const correctAnswers = answeredQuestions.reduce(reducer, 0);
    this.setState({
      totalAnswers,
      correctAnswers,
      resultReady: true,
    })
  }

  checkLastQuestion = () => {
    const { availableQuestions } = this.state;

    return availableQuestions.length === 0;
  }

  render() {
    const { currentQuestion, resultReady, totalAnswers, correctAnswers } = this.state;

    return (
      <div className="App">
        <Button onClick={this.start}>Start</Button>
        {currentQuestion &&
          <Question
            onSubmitQuestion={this.submitQuestion}
            onChangeAnswer={this.onChangeAnswer}
            question={currentQuestion}/>
        }
        {resultReady &&
          <Result correctAnswers={correctAnswers} totalAnswers={totalAnswers} />
        }
      </div>
    );
  }
}

export default App;
