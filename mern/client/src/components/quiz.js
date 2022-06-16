import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router";
import './quiz.css';

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

    const [quiz, setQuiz] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {

        
        async function getQuiz() {
            const response = await fetch(`http://localhost:5000/requests/getQuiz/${params.quizName.toString()}`)
            console.log(response);
            
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
              }
          
              const dbQuiz = await response.json();
              console.log(dbQuiz);
              if (!dbQuiz) {
                window.alert(`Quiz with name ${params.quizName.toString()} not found`);
                navigate("/");
                return;
              }
              
              let quiz = dbQuiz.quizQuestions;
              let currentIndex = quiz.length, randomIndex;
    
              while (currentIndex != 0 ) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
    
                  [quiz[currentIndex], quiz[randomIndex]] = [quiz[randomIndex], quiz[currentIndex]];
              }
    
              while (quiz.length > 5) {
                  quiz.pop();
              }

              setQuiz(quiz);
        }

        getQuiz();

    });
    // State values for quiz game
    const [quizStarted, setQuizStarted] = useState(false);
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

    if (!quizStarted) {
        return (
            <div className="quiz">
                <h1>Start Quiz</h1>
                <button className='start' onClick={setQuizStarted(true)}>Start</button>
            </div>
        )
    } else {

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
}

    // Hard coded quiz object, replace with quiz pulled from DB
    
    
    const romQuiz = [
                  
            { QuizQuestion: {
                isMulti: true,
                id:  '',
                question: 'Joseph Gordon-Levitt and Zooey Deschanel starred in which of the following rom-com movies?',
                answers: [{answerText: 'tt3152624'}, {answerText: 'tt1022603'} 
                ,{answerText: 'tt1486834'}, {answerText: 'tt1195478'}],
                correctIndex: 1
              }
            },
            { QuizQuestion: {
              isMulti: false,
              id:  'tt0098635',
              question: 'In “When Harry Met Sally,” what was the name of the song Harry and Sally were singing when they ran into Harry’s ex-wife, Helen?',
              answers: [{answerText: 'Surrey With a Fringe on Top'}, {answerText: 'Oh What a Beautiful Mornin’'} 
              ,{answerText: 'I’m Just a Girl Who Can’t Say No'}, {answerText: 'Poor Judd is Dead'}],
              correctIndex: 0
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Rebel Wilson and Liam Hemsworth starred in which of the following movies?',
              answers: [{answerText: 'tt1872818'}, {answerText: 'tt2194499'} 
              ,{answerText: 'tt0415978'}, {answerText: 'tt2452244'}],
              correctIndex: 3
              }
            },
            { QuizQuestion: {
              isMulti: false,
              id:  'tt0108160',
              question: 'In the beginning of “Sleepless in Seattle,” Tom Hanks moves to Seattle from what city?',
              answers: [{answerText: 'San Francisco'}, {answerText: 'Boston'} 
              ,{answerText: 'Chicago'}, {answerText: 'Brooklyn'}],
              correctIndex: 2
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Which of the following rom-com movies were NOT directed by Amy Heckerling?',
              answers: [{answerText: 'tt0408839'}, {answerText: 'tt0466839'} 
              ,{answerText: 'tt0112697'}, {answerText: 'tt0217630'}],
              correctIndex: 0
              }
            },
            { QuizQuestion: {
              isMulti: false,
              id:  'tt0147800',
              question: 'Which Shakespeare play is “10 Things I Hate About You” based on?',
              answers: [{answerText: 'The Winter’s Tale'}, {answerText: 'Taming of the Shrew'} 
              ,{answerText: 'Twelfth Night'}, {answerText: 'Cymbeline'}],
              correctIndex: 1
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Which of the following films is directed by Anne Fletcher?',
              answers: [{answerText: 'tt0817230'}, {answerText: 'tt0318283'} 
              ,{answerText: 'tt6957966'}, {answerText: 'tt0988595'}],
              correctIndex: 3
              }
            },
            { QuizQuestion: {
              isMulti: false,
              id:  'tt3846674',
              question: 'In “To All the Boys I’ve Loved Before,” how many letters does Lara Jean write? ',
              answers: [{answerText: '2'}, {answerText: '5'} 
              ,{answerText: '17'}, {answerText: '24'}],
              correctIndex: 1
              }
            },
            { QuizQuestion: {
              isMulti: true,
              id:  '',
              question: 'Which of the following rom-com movies is loosely based on the Jane Austen novel “Emma”?',
              answers: [{answerText: 'tt0112697'}, {answerText: 'tt0114924'} 
              ,{answerText: 'tt0247638'}, {answerText: 'tt0240890'}],
              correctIndex: 0
              }
            },
            { QuizQuestion: {
              isMulti: false,
              id:  'tt1041829',
              question: 'Who starred in “The Proposal” with Ryan Reynolds?',
              answers: [{answerText: 'Anne Hathaway'}, {answerText: 'Kate Hudson'} 
              ,{answerText: 'Sandra Bullock'}, {answerText: 'Rachel Weisz'}],
              correctIndex: 2
              }
            }

          ];
    
    const horrorQuiz = [
        { QuizQuestion: {
            isMulti: true,
            id:  '',
            question: 'Which of the following movies was NOT directed by Alfred Hitchcock?',
            answers: [{answerText: 'tt0056869'}, {answerText: 'tt0075005'} 
            ,{answerText: 'tt0054215'}, {answerText: 'tt0052357'}],
            correctIndex: 1
          }
        },
        { QuizQuestion: {
          isMulti: false,
          id:  'tt0094862',
          question: 'In what year was the movie "Child’s Play" released?',
          answers: [{answerText: '1988'}, {answerText: '1995'} 
          ,{answerText: '1980'}, {answerText: '1977'}],
          correctIndex: 0
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'Which of the following movies does NOT have a sequel?',
          answers: [{answerText: 'tt1591095'}, {answerText: 'tt0117571'} 
          ,{answerText: 'tt1130884'}, {answerText: 'tt1457767'}],
          correctIndex: 2
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'In which horror film do assassins wear fox, tiger, and lamb masks?',
          answers: [{answerText: 'tt0098084'}, {answerText: 'tt0080761'} 
          ,{answerText: 'tt0087800'}, {answerText: 'tt1853739'}],
          correctIndex: 3
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'Which film is directed by Ari Aster?',
          answers: [{answerText: 'tt0081505'}, {answerText: 'tt7784604'} 
          ,{answerText: 'tt2724064'}, {answerText: 'tt1179891'}],
          correctIndex: 1
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'The quote, “Do you like scary movies?” was made famous by which of the following movies?',
          answers: [{answerText: 'tt0081505'}, {answerText: 'tt0054215'} 
          ,{answerText: 'tt0077651'}, {answerText: 'tt0117571'}],
          correctIndex: 3
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'Actress Marilyn Burns starred in which of the following films?',
          answers: [{answerText: 'tt0083624'}, {answerText: 'tt0072271'} 
          ,{answerText: 'tt4935372'}, {answerText: 'tt0103919'}],
          correctIndex: 1
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'Which of the following films involved the death of nine individuals during its production?',
          answers: [{answerText: 'tt0119345'}, {answerText: 'tt0054215'} 
          ,{answerText: 'tt0091064'}, {answerText: 'tt0070047'}],
          correctIndex: 3
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'Which of the following movies was NOT based on a novel by Stephen King?',
          answers: [{answerText: 'tt0085407'}, {answerText: 'tt0087050'} 
          ,{answerText: 'tt0387564'}, {answerText: 'tt0091499'}],
          correctIndex: 2
          }
        },
        { QuizQuestion: {
          isMulti: true,
          id:  '',
          question: 'Which movie was originally titled “The Babysitter Murders”?',
          answers: [{answerText: 'tt0117571'}, {answerText: 'tt0077651'} 
          ,{answerText: 'tt0063522'}, {answerText: 'tt0087800'}],
          correctIndex: 2
          }
        }

      ]