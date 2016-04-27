var pollid;
function postvideo(url){
  $.ajax({
    type: "POST",
    url: "/api/nextvideo",
    data: {video_name: url},
    success: function(){
      $('#message').html("Success")
    },
  })
}

function poll(){
  $.ajax({
    url: "/api/nextvideo",
    success: function(data) {
      if (data){
        clearInterval(pollid);
        handleData(data);
      }
    }
});
}

function handleData(data){
  console.log("handle data")
  if (data.video_name.endsWith(".mp3")){
    $("#audio > source").attr("src",data.video_name)
    $("#audio").load()
  }
  if (data.video_name.endsWith(".mp4")){
    console.log("video")
    $("#video > source").attr("src",data.video_name)
    $("#video")[0].load()
    $("#video")[0].play()
  }
}

function media_ended(){
  $("#video > source").attr("src","")
  $("#video")[0].load()
  pollid = setInterval(function(){ poll(); }, 1000);
}
