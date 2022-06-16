import React, { useEffect, useState} from 'react';
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

  const [quiz, setQuiz] = useState(defaultQuiz);

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
                      <div class="card-group">
                      <div className='answers'>
                          {quiz[currentQuestion].answers.map((answer, index) => (
                              <div key={index} class='card' onClick={() => handleAnswerOptionClick(index === quiz[currentQuestion].correctIndex)}>
                                <img src={answer.answerImg} class="card-img-top"></img>
                                <div class="card-body">
                                  <p class="card-text">{answer.answerText}</p>
                                </div>
                              </div>
                              ))}
                      </div>
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
    const defaultQuiz = [
        { 
            isMulti: true,
            id:  '',
            question: 'Which of the following movies was NOT directed by Alfred Hitchcock?',
            answers: [{answerText: 'The Birds', answerImg: 'https://m.media-amazon.com/images/M/MV5BMTAxNDA1ODc5MDleQTJeQWpwZ15BbWU4MDg2MDA4OTEx._V1_SX300.jpg'}, {answerText: 'The Omen', answerImg: 'https://m.media-amazon.com/images/M/MV5BZmNjZDcwNTMtMjQxMy00ZTY5LTg4M2YtYjA5NDliNjNhYzQ3XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'} 
            ,{answerText: 'Psycho', answerImg: 'https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'}, {answerText: 'Vertigo', answerImg: 'https://m.media-amazon.com/images/M/MV5BYTE4ODEwZDUtNDFjOC00NjAxLWEzYTQtYTI1NGVmZmFlNjdiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'}],
            correctIndex: 1

        },
        { 
          isMulti: true,
          id:  '',
          question: 'Which of the following movies does NOT have a sequel?',
          answers: [{answerText: 'Insidious', answerImg: 'https://m.media-amazon.com/images/M/MV5BMTYyOTAxMDA0OF5BMl5BanBnXkFtZTcwNzgwNTc1NA@@._V1_SX300.jpg'}, {answerText: 'Scream', answerImg: 'https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_SX300.jpg'} 
          ,{answerText: 'Shutter Island', answerImg: 'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'}, {answerText: 'The Conjuring', answerImg: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg'}],
          correctIndex: 2
          
        },
        { 
          isMulti: true,
          id:  '',
          question: 'In which horror film do assassins wear fox, tiger, and lamb masks?',
          answers: [{answerText: 'Pet Sematary', answerImg: 'https://m.media-amazon.com/images/M/MV5BYjBlNTBhYWQtMzg5Yi00NDA2LWJmMjYtZmM0ODhiYzkwYmY5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'}, {answerText: 'Friday the 13th', answerImg: 'https://m.media-amazon.com/images/M/MV5BNWMxYTYzYWQtNGZmNy00MTg5LTk1N2MtNzQ5NjQxYjQ5NTJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'} 
          ,{answerText: 'A Nightmare on Elm Street', answerImg: 'https://m.media-amazon.com/images/M/MV5BNzFjZmM1ODgtMDBkMS00NWFlLTg2YmUtZjc3ZTgxMjE1OTI2L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'}, {answerText: 'You\'re Next', answerImg: 'https://m.media-amazon.com/images/M/MV5BMTQwODAxMTE1NF5BMl5BanBnXkFtZTcwNTQ0MjY3OQ@@._V1_SX300.jpg'}],
          correctIndex: 3
          
        },
        { 
          isMulti: true,
          id:  '',
          question: 'Which film is directed by Ari Aster?',
          answers: [{answerText: 'The Shining', answerImg: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'}, {answerText: 'Hereditary', answerImg: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_SX300.jpg'} 
          ,{answerText: 'Sharknado', answerImg: 'https://m.media-amazon.com/images/M/MV5BODcwZWFiNTEtNDgzMC00ZmE2LWExMzYtNzZhZDgzNDc5NDkyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'}, {answerText: 'My Bloody Valentine', answerImg: 'https://m.media-amazon.com/images/M/MV5BMTY2MTQ1OTcxOF5BMl5BanBnXkFtZTcwMjc2ODUxMg@@._V1_SX300.jpg'}],
          correctIndex: 1
          
        },
        { 
          isMulti: true,
          id:  '',
          question: 'Which of the following films involved the death of nine individuals during its production?',
          answers: [{answerText: 'I Know What You Did Last Summer', answerImg: 'https://m.media-amazon.com/images/M/MV5BY2JlY2JlYTYtNmI3NC00YTk3LWEyYTgtNzg0ODJlYzViNjc4XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'}, {answerText: 'Psycho', answerImg: 'https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'} 
          ,{answerText: 'The Fly', answerImg: 'https://m.media-amazon.com/images/M/MV5BODcxMGMwOGEtMDUxMi00MzE5LTg4YTYtYjk1YjA4MzQxNTNlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'}, {answerText: 'The Exorcist', answerImg: 'https://m.media-amazon.com/images/M/MV5BYWFlZGY2NDktY2ZjOS00ZWNkLTg0ZDAtZDY4MTM1ODU4ZjljXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'}],
          correctIndex: 3
          
        },
      ];