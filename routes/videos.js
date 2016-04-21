var express = require('express');
var sqllite3 = require('sqlite3');
var db = new sqllite3.Database("./data/videoqueue.db")
var router = express.Router();
var fs = require('fs');
var path = require('path');
//https://github.com/mapbox/node-sqlite3/wiki/API
/* GET users listing. */
router.get('/nextvideo', function(req, res, next) {
  db.get("SELECT rowid, video_name from video_queue where played = 'false'",function(err,row){
    if (row){
      db.run("UPDATE video_queue SET played = 'true' where rowid = $rowid",{
        $rowid: row.rowid
      })
      res.send(row);
    } else {
      res.send();
    }
  });
});

router.get('/allvideo',function(req,res,next){
  db.all("Select rowid as id, * from video_queue",function(err,row){
    if (row){
      res.send(row);
    } else {
      res.send("No Results")
    }
  })
})

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
      var filename = files[i]
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            name = "/videos/" + filename;
            files_.push(name);
        }
    }
    return files_;
}

router.get('/vidsfromfolder', function(req,res,next){
  files = getFiles('./public/videos')
  res.send(JSON.stringify(files))
})

router.post('/nextvideo',function(req,res, next){
  db.run("INSERT INTO video_queue(video_name, played) VALUES ($video_name, $played)",{
    $video_name: req.body.video_name,
    $played: "false"
  },function(dbres){
    res.send(dbres);
  });
});

router.param('rowid',function(req,res,next,rowid){
  req.rowid = rowid;
  next();
});

router.delete('/nextvideo/:rowid', function(req,res, next){
  console.log("delete " + req.params.rowid);
  db.run("DELETE from video_queue where rowid = $rowid",{
    $rowid: req.params.rowid
  },function(dbres){
    res.send(dbres);
  });
});

module.exports = router;
