import React, {useState} from 'react';

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
            correctIndex: 2
        },
        {
            questionText: 'Which of the following movies does NOT have a sequel?',
            answerOptions: [
                {answerText: 'Insidious'},
                {answerText: 'Scream'},
                {answerText: 'Shutter Island'},
                {answerText: 'The Conjuring'}
            ],
            correctIndex: 3
        },
        {
            questionText: 'What is the name of the evil doll in Child\'s Play?',
            answerOptions: [
                {answerText: 'Charlie'},
                {answerText:'Chucky'},
                {answerText:'Chastity'},
                {answerText:'Chase'}
            ],
            correctIndex: 2
        },
        {
            questionText: 'In which movie do the killers wear fox, tiger, and lamb masks?',
            answerOptions: [
                {answerText: 'Pet Semetary'},
                {answerText: 'Friday the 13th'},
                {answerText: 'A Nightmare on Elm Street'},
                {answerText: 'You\'re Next'}
            ],
            correctIndex: 4
        },
        {
            questionText: 'Which film is directed by Ari Aster?',
            answerOptions: [
                {answerText: 'The Shining'},
                {answerText: 'Hereditary'},
                {answerText: 'Sharknado'},
                {answerText:'My Bloody Valentine'}
            ],
            correctIndex: 2
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
        // Increment player score if correct option selected
        if (isCorrect) {
            setScore(score + 1);
        }
        let thisQuestion = questions[currentQuestion];
        setCorrectAnswer(thisQuestion.answerOptions[thisQuestion.correctIndex].answerText);
        setAnswerStatus(isCorrect);
    }

    const onNextClick = () => { 
        // Move on to next question if there is one, otherwise show results
        if (currentQuestion+1 === questions.length) {
            setShowScore(true);
        } else {
            setCurrentQuestion(currentQuestion+1)
            setAnswerStatus(null);
        }
    }

    return (
        <div className='quiz'>
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
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
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button onClick={() => handleAnswerOptionClick(index === questions[currentQuestion].correctIndex)}>{answerOption.answerText}</button>
                        ))}
                    </div>
                    {answerStatus != null && (
                        <div>
                            <div className='answerResult'>
                                {answerStatus ? "Correct!" : "Incorrect, the correct answer was: " + {correctAnswer}}
                                <button className='next' onClick={onNextClick}>
                                    {currentQuestion === questions.length - 1 ? "See results" : "Next Question"}
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}