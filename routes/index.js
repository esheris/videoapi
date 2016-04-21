var express = require('express');
var router = express.Router();
var request = require('request');

function get_allvideos(req, callback) {
    var options = {
        uri : "http://" + req.get('host') + '/api/vidsfromfolder',
        method : 'GET'
    };
    var res = '';
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res = body;
        }
        else {
            res = 'Not Found';
        }
        callback(res);
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  get_allvideos(req,function(resp){
    console.log(resp)
    res.render('index',{videos: resp})
  })
});

module.exports = router;
