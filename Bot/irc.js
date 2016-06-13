var irc = require("tmi.js")
var request = require ('request')

var mychannel = "#phantasaia"
var cmdtimeout = 120000;

var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: "mystbot",
    password: "oauth:wqtu7y0gp5di1t0982gng3ysniafnc"
  },
  channels: [mychannel]
};

var client = new irc.client(options);
var rekt = 0
var rektLastCalled = Date.now();
client.connect()
client.on("chat", function(channel, user, message, self){
  if (message.includes("phanRekt")){
    rekt ++;
    console.log('Rekt = ' + rekt);
  }
  if ((rekt >= 3) && ((Date.now() - rektLastCalled) > cmdtimeout)){
    postvideo('/media/somebodysbitch.mp4')
    rekt = 0;
  }
})

function postvideo(url){
  request.post(
    "http://localhost:3000/api/nextvideo", {
      form:{
        video_name: url
      }
    }
  )
}
