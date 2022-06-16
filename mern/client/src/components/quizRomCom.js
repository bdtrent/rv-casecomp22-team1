import React, { useState} from 'react';
import './quiz.css';

// Progress bar that shows at top of quiz
const ProgressBar = ({
    currentQuestion, questionCount
}) => {
    const progressPercentage = (currentQuestion / questionCount) * 100

    return <div className='progressBar'>
        <div className='text'>
            {currentQuestion} answered ({questionCount - currentQuestion} remaining)
        </div>
        <div className='inner' style={{width: `${progressPercentage}%`}} />
    </div>
}

export default function Quiz() {

    // State values for quiz game
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    // Event whenever an answer is clicked
    const handleAnswerOptionClick = (isCorrect) => {
        if(correctAnswer == null) {
            // Increment player score if correct option selected
            if (isCorrect) {
                setScore(score + 1);
                setCorrectAnswer("Correct!");
            }
            else {
                setCorrectAnswer("Incorrect, the correct answer was: "+ quiz[currentQuestion].answers[quiz[currentQuestion].correctIndex].answerText)
            }
            setAnswerStatus(isCorrect);
        }
    }

    const onNextClick = () => { 
        // Move on to next question if there is one, otherwise show results
        if (currentQuestion+1 === quiz.length) {
            setShowScore(true);
        } else {
            setCurrentQuestion(currentQuestion+1)
            setCorrectAnswer(null);
            setAnswerStatus(null);
        }
    }

    // Resets quiz state
    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setCorrectAnswer(null);
        setAnswerStatus(null);
        setShowScore(false);
        setScore(0);
    }

    async function getMovie(answerText) {
        const response = await fetch(`http://localhost:5000/requests/getMovie/${answerText}`);
        const movie = await response.json();
        return <img src={movie.Poster}></img>
    }
    
    return (
          <div className='quiz'>
              {showScore ? (
                  <div className='score-section'>
                      You scored {score} out of {quiz.length}
                      <div>
                      <button className='retake' onClick={handleRetakeQuiz}>
                      Retake this quiz
                      </button>
                      </div>
                    </div>
              ): (
                  <>
                      <ProgressBar currentQuestion={currentQuestion} questionCount={quiz.length} />
                      <div className='question'>
                          <div className='question-text'>
                              {quiz[currentQuestion].question}
                          </div>
                      </div>
                      <div className='answers'>
                          {quiz[currentQuestion].isMulti
                              ? quiz[currentQuestion].answers.map((answer, index) => (
                              <div key={index} className='answerCard' onClick={() => handleAnswerOptionClick(index === quiz[currentQuestion].correctIndex)}>{getMovie(answer.answerText)}</div>
                              ))
                              : quiz[currentQuestion].answer.map((answer, index) => (
                                  <div key={index} className='answerText' onClick={() => handleAnswerOptionClick(index === quiz[currentQuestion].correctIndex)}>{answer.answerText}</div>
                              ))
                          }
                      </div>
                      {answerStatus != null && (
                          <div>
                              <div className='answerResult'>
                                  {correctAnswer}
                              </div>
                              <button className='next' onClick={onNextClick}>
                                      {currentQuestion === quiz.length - 1 ? "See results" : "Next Question"}
                                  </button>
                          </div>
                        )}
                  </>
              )}
          </div>
    );
}

    // Hard coded quiz object, replace with quiz pulled from DB
    
    
    const quiz = [
                  
            { QuizQuestion: {
                isMulti: true,
                id:  '',
                question: 'Joseph Gordon-Levitt and Zooey Deschanel starred in which of the following rom-com movies?',
                answers: [{answerText: 'tt3152624', answerImg: ''}, {answerText: 'tt1022603', answerImg: ''} 
                ,{answerText: 'tt1486834', answerImg: ''}, {answerText: 'tt1195478', answerImg: ''}],
                correctIndex: 1
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Rebel Wilson and Liam Hemsworth starred in which of the following movies?',
              answers: [{answerText: 'tt1872818', answerImg: ''}, {answerText: 'tt2194499', answerImg: ''} 
              ,{answerText: 'tt0415978', answerImg: ''}, {answerText: 'tt2452244', answerImg: ''}],
              correctIndex: 3
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Which of the following rom-com movies were NOT directed by Amy Heckerling?',
              answers: [{answerText: 'tt0408839', answerImg: ''}, {answerText: 'tt0466839', answerImg: ''} 
              ,{answerText: 'tt0112697', answerImg: ''}, {answerText: 'tt0217630', answerImg: ''}],
              correctIndex: 0
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Which of the following films is directed by Anne Fletcher?',
              answers: [{answerText: 'tt0817230', answerImg: ''}, {answerText: 'tt0318283', answerImg: ''} 
              ,{answerText: 'tt6957966', answerImg: ''}, {answerText: 'tt0988595', answerImg: ''}],
              correctIndex: 3
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Which of the following rom-com movies is loosely based on the Jane Austen novel “Emma”?',
              answers: [{answerText: 'tt0112697', answerImg: ''}, {answerText: 'tt0114924', answerImg: ''} 
              ,{answerText: 'tt0247638', answerImg: ''}, {answerText: 'tt0240890', answerImg: ''}],
              correctIndex: 0
              }
            },
          ];