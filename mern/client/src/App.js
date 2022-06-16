import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";

import "./App.css";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
      <Route exact path="/" element={<Homepage />}/>
      <Route path="/quiz/:quizName"/>
     </Routes>
   </div>
 );
};
 
export default App;