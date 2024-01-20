var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}))
app.use(express.static('public'));



app.get("/", function(req, res){
   res.sendFile(path.join(__dirname,'./public/form.html'));

});
// app.get("/user", function(req, res){
//     res.send("bari or user ");
//  });
//  app.get("/shop", function(req, res){    
//     res.send("esty hameceq ");
//  });
//  app.get("/user/:id", function(req, res){
//     var a = req.params.id;
//     res.send("<h1>Hello " + a +"</h1>");
//  });

// app.get("/google", function (req, res) {
//     res.redirect('https://www.google.com/&#39')
// });
    
// app.get("/google/:search", function (req, res) {
//     var info = req.params.search;
//     res.redirect('https://www.google.com/search?q='+ info)
// });

app.post("/addinfo", function(req, res){
    const login = req.body.login;
    const age = req.body.age;
    console.log(login,age);
 });

app.get("/*", function (req, res) {
    res.send("404 not found");
}); 

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
