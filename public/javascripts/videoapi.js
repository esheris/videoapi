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
  $.ajax({ url: "/api/nextvideo", success: function(data) {
      if (data){
          $('#display').html = "<video><source src=" + data.video_name +</video>
      } else {
        $('#display').html = ""
      }
  } });
}
