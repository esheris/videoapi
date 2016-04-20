var express = require("express");
var bodyParser = require("body-parser");
var redis = require("redis")
var fs = require("fs");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readdir('./videos', function(err, items) {
  console.log(items);
  for (var i=0; i<items.length;i++) {
    //write to redis
  }
})

var routes = require("./routes/routes.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
