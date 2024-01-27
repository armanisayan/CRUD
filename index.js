var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://armanisayan:Aram-191209@cluster0.8qkw6kt.mongodb.net/sample_mflix';

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}))

app.use(express.static('public'));


app.get("/", function (req, res) {


   mongoose.connect(connectionString, { useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');
      try {
         let mascots = await mongoose.connection.db.collection('theaters').find({ 'location.address.city': 'Bloomington' }).toArray()
         res.render('../public/form.ejs', {
            info: mascots
         })
         console.log('All Movies:', allMovies);
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }

   });

});


app.post("/addinfo", function (req, res) {
   const login = req.body.name;
   const email = req.body.email;
   const pass = req.body.password;


   mongoose.connect(connectionString, { useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');

      try {
         let mascots = await mongoose.connection.db.collection('theaters').find({ 'location.address.city': 'Bloomington' }).toArray()


         //    let allMovies = await mongoose.connection.db.collection('users').insertOne({
         //       name: login,
         //       email: email,
         //       password: pass
         //   });


         console.log('All Movies:', allMovies);
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }

      mongoose.connection.close();
   });
});

app.get("/*", function (req, res) {
   res.send("404 not found");
});

app.listen(3000, function () {
   console.log("Example is running on port 3000");
});
