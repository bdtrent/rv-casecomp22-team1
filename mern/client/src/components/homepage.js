import React from "react";

const quizzes = [{
    name: "Horror", 
    name: "General"
}]
export default function Homepage(){
    return(
        <div>
            <h2 id="homeTitle">Choose Your Trivia!</h2>
            <div id="initialSelection">
                <button>Horror Genre Quiz</button>
                <button>General Genre Quiz!</button>
            </div>
        </div>
    );
}