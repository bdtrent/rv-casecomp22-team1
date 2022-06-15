import React, {useState} from 'react';

export default function Quiz() {
    // Hard coded quiz object, replace with quiz pulled from DB
    const questions = [
        {
            questionText: 'Which of the following movies was NOT directed by Alfred Hitchcock?',
            answerOptions: [
                { answerText: 'The Birds', isCorrect: false},
                { answerText: "The Omen", isCorrect: true},
                {answerText: 'Psycho', isCorrect: false},
                {answerText:'Vertigo', isCorrect: false}
            ]
        },
        {
            questionText: 'Which of the following movies does NOT have a sequel?',
            answerOptions: [
                {answerText: 'Insidious', isCorrect:false},
                {answerText: 'Scream', isCorrect:false},
                {answerText: 'Shutter Island', isCorrect:true},
                {answerText: 'The Conjuring', isCorrect:false}
            ]
        },
        {
            questionText: 'What is the name of the evil doll in Child\'s Play?',
            answerOptions: [
                {answerText: 'Charlie', isCorrect:false},
                {answerText:'Chucky', isCorrect:true},
                {answerText:'Chastity', isCorrect:false},
                {answerText:'Chase', isCorrect:false}
            ]
        },
        {
            questionText: 'In which movie do the killers wear fox, tiger, and lamb masks?',
            answerOptions: [
                {answerText: 'Pet Semetary', isCorrect:false},
                {answerText: 'Friday the 13th', isCorrect:false},
                {answerText: 'A Nightmare on Elm Street', isCorrect:false},
                {answerText: 'You\'re Next', isCorrect:true}
            ]
        },
        {
            questionText: 'Which film is directed by Ari Aster?',
            answerOptions: [
                {answerText: 'The Shining', isCorrect:false},
                {answerText: 'Hereditary', isCorrect:true},
                {answerText: 'Sharknado', isCorrect:false},
                {answerText:'My Bloody Valentine', isCorrect:false}
            ]
        }
    ];

    // State values for quiz game
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    // Event whenever an answer is clicked
    const handleAnswerOptionClick = (isCorrect) => {
        // Increment player score if correct option selected
        if (isCorrect) {
            setScore(score + 1);
        }

        // Move on to next question if there is one, otherwise show results
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className='quiz'>
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>
            ): (
                <>
                    <div className='question'>
                        <div className='question-count'>
                            <span>Question {currentQuestion+1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>
                            {questions[currentQuestion].questionText}
                        </div>
                    </div>
                    <div className='answers'>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}