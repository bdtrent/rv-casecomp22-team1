import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
<<<<<<< HEAD
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Quiz from "./components/quiz";
=======
import Homepage from "./components/homepage";

import "./App.css";
import Quiz from "./components/quiz"
>>>>>>> ccaa3a4b873989a631f5caf839ce90b85c6eb1ab
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
<<<<<<< HEAD
       <Route exact path="/" element={<RecordList />} />
       <Route exact path="/quiz" element={<Quiz />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
=======
      <Route exact path="/" element={<Homepage />}/>
      <Route path="/quiz/:quizName" element={<Quiz />}/>
>>>>>>> ccaa3a4b873989a631f5caf839ce90b85c6eb1ab
     </Routes>
   </div>
 );
};
 
export default App;