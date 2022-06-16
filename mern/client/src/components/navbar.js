import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div id="navbar">
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img src="assets/movie-trivia.png" alt="Movie Trivia" style={{"width" : 25 + '%'}} id="logo"></img>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
<<<<<<< HEAD
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Create Record
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/quiz">
               Take Quiz
             </NavLink>
           </li>
         </ul>
       </div>
=======


>>>>>>> ccaa3a4b873989a631f5caf839ce90b85c6eb1ab
     </nav>
   </div>
 );
}