var express = require('express');
var sqllite3 = require('sqlite3');
var db = new sqllite3.Database("./data/videoqueue.db")
var router = express.Router();
//https://github.com/mapbox/node-sqlite3/wiki/API
/* GET users listing. */
router.get('/nextvideo', function(req, res, next) {
  db.get("SELECT rowid, video_name from video_queue where played = 'false'",function(err,row){
    /*db.run("Delete from video_queue where rowid = $rowid",{
      $rowid: row.rowid
    })*/
    console.log(row);
    res.send(row);
  })
  
});

router.post('/nextvideo',function(req,res,next){
  console.log("req");
  db.run("INSERT INTO video_queue(video_name, played) VALUES ($video_name, $played)",{
    $video_name: req.body.video_name,
    $played: "false"
  },function(dbres){
    res.send(dbres)
  });
})

module.exports = router;
