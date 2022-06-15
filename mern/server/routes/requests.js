const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const requestRoutes = express.Router();

// This will return movie data to the front end given an IMDB movie ID.
requestRoutes.route("/request").getDataByID(function (req, res) {
    let request = new XMLHttpRequest();
    let url = "http://www.omdbapi.com/?i=" + req.params.id + "&apikey=<1558749f>";
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