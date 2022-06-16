const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /requests.
const requestRoutes = express.Router();

const ObjectId = require("mongodb").ObjectId;
const dbo = require("../db/conn");

// This will return movie data to the front end given an IMDB movie ID.
requestRoutes.route("/requests/getMovie/:id").get(function (req, res) {
    let request = new XMLHttpRequest();
    let url = "http://www.omdbapi.com/?i=" + req.params.id + "&apikey=1558749f";
    request.open("GET", url)
    request.send()
    request.onload = () => {
        console.log(request)
        if (request.status == 200){
            console.log(JSON.parse(request.response()))
            res.json(request.response());
        } else {
            console.log('error ${request.status} ${request.statusText}')
        }
    }
});

// Function getQuizByQuizName
// This section will help you get a single record by Quiz Name
requestRoutes.route("/requests/getQuiz/:quizName").get(function (req, res) {
    console.log(req.params.quizName);
    let db_connect = dbo.getDb();
    let myquery = { quizName: req.params.quizName};
    db_connect
        .collection("Quizzes")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
   });

module.exports = requestRoutes;   