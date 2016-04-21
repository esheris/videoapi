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
