var irc = require("tmi.js")
var request = require ('request')

var mychannel = "#phantasaia"
var emotetimeout = 120000;
var cmdTimeout = 30000;
var overwatchTimeout = 60000;

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
    password: ""
  },
  channels: [mychannel]
};

var client = new irc.client(options);
var rekt = 0
var rektLastCalled = Date.now();
var chuckLastCall = Date.now()
var junkratLastCall = Date.now()
var pharahLastCall = Date.now()
var s76LastCall = Date.now()
client.connect()
client.on("chat", function(channel, user, message, self){
  if (message.includes("phanRekt")){
    rekt ++;
  }
  if ((rekt >= 3) && ((Date.now() - rektLastCalled) > emotetimeout)){
    postvideo('/media/somebodysbitch.mp4')
    rekt = 0;
    rektLastCalled = Date.now()
  }
  if ((message.startsWith("!chuck")) && ((Date.now() - chuckLastCall) > cmdTimeout)){
    getchuckJoke()
    chuckLastCall = Date.now()
  }
  if ((message.startsWith("!junkrat")) && ((Date.now() - junkratLastCall) > overwatchTimeout)){
    postvideo('/media/tire-bot.mp4')
    junkratLastCall = Date.now()
  }
  if ((message.startsWith("!pharah")) && ((Date.now() - pharahLastCall) > overwatchTimeout)){
    postvideo('/media/JusticeRains-bot.mp4')
    pharahLastCall = Date.now()
  }
  if ((message.startsWith("!76")) && ((Date.now() - s76LastCall) > overwatchTimeout)){
    postvideo('/media/S76-bot.mp4')
    s76LastCall = Date.now()
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
