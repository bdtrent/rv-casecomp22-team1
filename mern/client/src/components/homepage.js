import React from "react";

const quizzes = [
    { id: 1, name: "Horror"},
    { id: 2, name: "General"}
];
export default function Homepage(){
    return(
        <div>
            <h2 id="homeTitle">Choose Your Trivia!</h2>
            <div id="initialSelection">
                {quizzes.map(quizzes => {
                    return(
                        <button key={quizzes.id}>Start {quizzes.name} Genre Quiz</button>
                    )
                })}
            </div>
        </div>
    );
}