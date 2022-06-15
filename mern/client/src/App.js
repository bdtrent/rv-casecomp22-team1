import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import Homepage from "./components/homepage";

import "./App.css";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route path="/" element={<Homepage />}/>

       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;