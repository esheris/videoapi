var irc = require("tmi.js")
var request = require ('request')

var mychannel = "#phantasaia"
var emotetimeout = 120000;
var cmdTimeout = 30000;

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
var chuckLastCall = Date.now()
client.connect()
client.on("chat", function(channel, user, message, self){
  if (message.includes("phanRekt")){
    rekt ++;
  }
  if ((rekt >= 3) && ((Date.now() - rektLastCalled) > emotetimeout)){
    postvideo('/media/somebodysbitch.mp4')
    rekt = 0;
  }
  if ((message.startsWith("!chuck")) && ((Date.now() - chuckLastCall) > cmdTimeout)){
    getchuckJoke()
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

function getchuckJoke(){
  request.get("https://api.chucknorris.io/jokes/random",function(error,response,body){
    if (!error && response.statusCode == 200){
      client.say(mychannel, JSON.parse(body).value)
    }
  })
}
