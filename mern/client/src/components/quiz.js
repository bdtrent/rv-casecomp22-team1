import React, {useEffect, useState} from 'react';
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
    useEffect(() => {
        async function getQuiz() {
            const response = await fetch(`http://localhost:5000/quiz/${params.name.toString()}`)
            
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
              }
          
              const dbQuiz = await response.json();
              if (!dbQuiz) {
                window.alert(`Quiz with name ${params.name.toString()} not found`);
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

        return;
    })
    // Hard coded quiz object, replace with quiz pulled from DB
    const questions = [
        {
            questionText: 'Which of the following movies was NOT directed by Alfred Hitchcock?',
            answerOptions: [
                { answerText: 'The Birds'},
                { answerText: "The Omen"},
                { answerText: 'Psycho'},
                { answerText: 'Vertigo'}
            ],
            correctIndex: 1
        },
        {
            questionText: 'Which of the following movies does NOT have a sequel?',
            answerOptions: [
                {answerText: 'Insidious'},
                {answerText: 'Scream'},
                {answerText: 'Shutter Island'},
                {answerText: 'The Conjuring'}
            ],
            correctIndex: 2
        },
        {
            questionText: 'What is the name of the evil doll in Child\'s Play?',
            answerOptions: [
                {answerText: 'Charlie'},
                {answerText:'Chucky'},
                {answerText:'Chastity'},
                {answerText:'Chase'}
            ],
            correctIndex: 1
        },
        {
            questionText: 'In which movie do the killers wear fox, tiger, and lamb masks?',
            answerOptions: [
                {answerText: 'Pet Semetary'},
                {answerText: 'Friday the 13th'},
                {answerText: 'A Nightmare on Elm Street'},
                {answerText: 'You\'re Next'}
            ],
            correctIndex: 3
        },
        {
            questionText: 'Which film is directed by Ari Aster?',
            answerOptions: [
                {answerText: 'The Shining'},
                {answerText: 'Hereditary'},
                {answerText: 'Sharknado'},
                {answerText:'My Bloody Valentine'}
            ],
            correctIndex: 1
        }
    ];

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
                setCorrectAnswer("Incorrect, the correct answer was: "+ questions[currentQuestion].answerOptions[questions[currentQuestion].correctIndex].answerText)
            }
            setAnswerStatus(isCorrect);
        }
    }

    const onNextClick = () => { 
        // Move on to next question if there is one, otherwise show results
        if (currentQuestion+1 === questions.length) {
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
        return movie.Poster;
    }

    return (

        <div className='quiz'>
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                    <div>
                    <button className='retake' onClick={handleRetakeQuiz}>
                    Retake this quiz
                    </button>
                    </div>
                </div>
            ): (
                <>
                    <ProgressBar currentQuestion={currentQuestion} questionCount={questions.length} />
                    <div className='question'>
                        <div className='question-text'>
                            {questions[currentQuestion].questionText}
                        </div>
                    </div>
                    <div className='answers'>
                        {questions[currentQuestion].isMulti
                            ? questions[currentQuestion].answers.map((answer, index) => (
                            <div key={index} className='answerCard' onClick={() => handleAnswerOptionClick(index === questions[currentQuestion].correctIndex)}>{getMovie(answer.answerText)}</div>
                            ))
                            : questions[currentQuestion].answer.map((answer, index) => (
                                <div key={index} className='answerText' onClick={() => handleAnswerOptionClick(index === questions[currentQuestion].correctIndex)}>{answer.answerText}</div>
                            ))
                        }
                    </div>
                    {answerStatus != null && (
                        <div>
                            <div className='answerResult'>
                                {correctAnswer}
                            </div>
                            <button className='next' onClick={onNextClick}>
                                    {currentQuestion === questions.length - 1 ? "See results" : "Next Question"}
                                </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}