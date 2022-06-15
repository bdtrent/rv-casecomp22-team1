import React from "react";

export default function Homepage(){
    return(
        <div>
            <h2 id="homeTitle">Choose Your Trivia!</h2>
            <div id="initialSelection">
                <button>Horror Genre Quiz</button>
                <button>Random Genre Quiz!</button>
            </div>
        </div>
    );
}