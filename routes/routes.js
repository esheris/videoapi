var appRouter = function(app) {
  app.get("/", function(req,res){
    res.send("Hello World")
  }),
  app.post("/",function(req,res){
    return res.send(req.body)
  })
}

module.exports = appRouter;
