import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizApp = () => {
  const questions = [
    {
      question: 'What does HTML stand for?',
      type: 'single', // 'single' for radio buttons
      options: [
        { label: 'Hyper Text Markup Language', value: 'Hyper Text Markup Language' },
        { label: 'Hyperlink and Text Markup Language', value: 'Hyperlink and Text Markup Language' },
        { label: 'High Text Markup Language', value: 'High Text Markup Language' },
        { label: 'Hyper Transfer Markup Language', value: 'Hyper Transfer Markup Language' },
      ],
      correctAnswers: ['Hyper Text Markup Language'],
    },
    {
      question: 'Which of the following is a programming language?',
      type: 'multiple', // 'multiple' for checkboxes
      options: [
        { label: 'HTML', value: 'HTML' },
        { label: 'CSS', value: 'CSS' },
        { label: 'JavaScript', value: 'JavaScript' },
        { label: 'XML', value: 'XML' },
      ],
      correctAnswers: ['JavaScript', 'CSS'],
    },
    {
      question: 'What is the purpose of the "git clone" command?',
      type: 'single',
      options: [
        { label: 'To create a new Git repository', value: 'create' },
        { label: 'To copy a repository from the remote server', value: 'copy' },
        { label: 'To delete a Git repository', value: 'delete' },
        { label: 'To merge branches in a repository', value: 'merge' },
      ],
      correctAnswers: ['copy'],
    },
    {
      question: 'In JavaScript, what is the purpose of the "typeof" operator?',
      type: 'single',
      options: [
        { label: 'To check the type of a variable', value: 'check' },
        { label: 'To create a new variable', value: 'create' },
        { label: 'To perform a mathematical operation', value: 'math' },
        { label: 'To define a function', value: 'function' },
      ],
      correctAnswers: ['check'],
    },
    {
      question: 'Which of the following are object-oriented programming languages?',
      type: 'multiple',
      options: [
        { label: 'Java', value: 'Java' },
        { label: 'Python', value: 'Python' },
        { label: 'C', value: 'C' },
        { label: 'Ruby', value: 'Ruby' },
      ],
      correctAnswers: ['Java', 'Python'],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill([]));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(Array(questions.length).fill(false));
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [showUserResponses, setShowUserResponses] = useState(false);
  const [backToHome, setBackToHome] = useState(false);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0 && !showScore && !backToHome) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [timeRemaining, showScore, backToHome]);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleFinishQuiz();
    }
    // eslint-disable-next-line
  }, [timeRemaining]);

  const handleCheckboxChange = (optionValue) => {
    const updatedAnswers = [...userAnswers];
    const currentAnswers = updatedAnswers[currentQuestion];

    if (currentAnswers.includes(optionValue)) {
      updatedAnswers[currentQuestion] = currentAnswers.filter((value) => value !== optionValue);
    } else {
      updatedAnswers[currentQuestion] = [...currentAnswers, optionValue];
    }

    setUserAnswers(updatedAnswers);
    setQuestionAnswered((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = true;
      return updated;
    });
  };

  const handleRadioChange = (optionValue) => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = [optionValue];
      return updated;
    });

    setQuestionAnswered((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = true;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (questionAnswered[currentQuestion] || userAnswers[currentQuestion].length > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      alert("Please answer the question before moving to the next one.");
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prevQuestion) => Math.max(0, prevQuestion - 1));
  };

  const handleFinishQuiz = () => {
    if (userAnswers.every((answers) => answers.length > 0)) {
      setScore(calculateScore());
      setShowScore(true);
      setShowUserResponses(true);
    } else {
      alert("Please answer all questions before finishing the quiz.");
    }
  };

  const calculateScore = () => {
    return questions.reduce((totalScore, question, index) => {
      const correctAnswers = question.correctAnswers.sort();
      const userSelection = userAnswers[index].sort();

      return (
        totalScore +
        (JSON.stringify(correctAnswers) === JSON.stringify(userSelection) ? 1 : 0)
      );
    }, 0);
  };

  const handleBackToHome = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(questions.length).fill([]));
    setShowScore(false);
    setScore(0);
    setQuestionAnswered(Array(questions.length).fill(false));
    setTimeRemaining(60);
    setShowUserResponses(false);
    setBackToHome(true);

    // Reset the backToHome state after a short delay to allow the component to reset
    setTimeout(() => {
      setBackToHome(false);
    }, 100);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isQuizFinished = currentQuestion === questions.length;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Header>
              <h2 className={!questionAnswered[currentQuestion] ? 'text-danger' : ''}>
                Question {currentQuestion + 1}
              </h2>
            </Card.Header>
            <Card.Body>
              {questions[currentQuestion] && <p className="lead">{questions[currentQuestion].question}</p>}
              <Form>
                <Form.Group controlId="formOptions">
                  {questions[currentQuestion]?.options.map((option) => (
                    <div key={option.value}>
                      {questions[currentQuestion].type === 'single' ? (
                        <Form.Check
                          type="radio"
                          id={option.value}
                          label={option.label}
                          value={option.value}
                          checked={userAnswers[currentQuestion][0] === option.value}
                          onChange={() => handleRadioChange(option.value)}
                          disabled={showScore}
                        />
                      ) : (
                        <Form.Check
                          type="checkbox"
                          id={option.value}
                          label={option.label}
                          value={option.value}
                          checked={userAnswers[currentQuestion].includes(option.value)}
                          onChange={() => handleCheckboxChange(option.value)}
                          disabled={showScore}
                        />
                      )}
                    </div>
                  ))}
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                Previous Question
              </Button>
              {' '}
              <Button
                variant="primary"
                onClick={isLastQuestion ? handleFinishQuiz : handleNextQuestion}
                disabled={isQuizFinished}
              >
                {isLastQuestion ? 'Finish' : 'Next Question'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {showScore && (
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8}>
            <Alert variant="success">
              <h2>Quiz Completed!</h2>
              <p>Your score is {score} out of {questions.length}.</p>
            </Alert>
          </Col>
        </Row>
      )}
      {showUserResponses && (
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8}>
            <Card>
              <Card.Header>
                <h2>User Responses:</h2>
              </Card.Header>
              <Card.Body>
                <ul>
                  {userAnswers.map((answers, index) => (
                    <li key={index}>
                      <strong>Question {index + 1}:</strong> {answers.join(', ') || 'No response'}
                      {questions[index].correctAnswers.sort().toString() === answers.sort().toString() ? (
                        <span style={{ color: 'green' }}> - Correct</span>
                      ) : (
                        <span style={{ color: 'red' }}> - Incorrect</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer className="text-muted">
                <div className="">
                  <Button variant="primary" onClick={handleBackToHome}>Try Again</Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8}>
          <p>Time remaining: {timeRemaining} seconds</p>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizApp;
