const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalUrl = baseUrl + crypto + fiat; 

    request(finalUrl, function(error, response, body) {
        var data = JSON.parse(body);
        var price = data.last;
        var currentDate = data.display_timestamp;

        res.write("<p>The current date is: " + currentDate + "</p>");
        res.write("<h1>The current value of " + crypto + " is: " + price + fiat + "USD</h1>");


        res.send();
    });
});

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
})