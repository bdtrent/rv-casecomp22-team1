import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";

import "./App.css";
import Quiz from "./components/quiz"
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
      <Route exact path="/" element={<Homepage />}/>
      <Route path="/quiz/:quizName" element={<Quiz />}/>
     </Routes>
   </div>
 );
};
 
export default App;