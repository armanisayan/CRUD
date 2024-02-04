var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const connectionString = 'mongodb+srv://armanisayan:Aram-191209@cluster0.8qkw6kt.mongodb.net/tumo_products';

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}))

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));



app.get("/", function (req, res) {

   mongoose.connect(connectionString, { useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');
      try {
         let mascots = await mongoose.connection.db.collection('products').find().toArray()
         res.render('../public/form.ejs', {
            info: mascots
         })
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }

   });

});


app.post("/addinfo", function (req, res) {
   const login = req.body.login;
   const price = req.body.price;
   const type = req.body.type;
   const salelocation = req.body.salelocation;

   mongoose.connect(connectionString, { useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');

      try {

         let allMovies = await mongoose.connection.db.collection('products').insertOne({
            login: login,
            price: price,
            type: type,
            salelocation: salelocation
         });

      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }

      mongoose.connection.close();
   });
});

app.get("/delete/:id", function (req, res) {
   var id = req.params.id;
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      try {
         let result = await mongoose.connection.db.collection('products').deleteOne({ _id: new ObjectId(id) });
         res.redirect("/");
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }
   })
});

app.get("/update/:id", function (req, res) {
   var id = req.params.id;
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
       try {
           let result = await mongoose.connection.db.collection('products').findOne({_id: new ObjectId(id)});
           res.render('../public/update.ejs', {
               obj: result
           });
       } catch (error) {
           console.error('Error retrieving movies:', error);
       } finally {
           mongoose.connection.close();
       }
   })
});


app.post("/updateData", function (req, res) {
   const login = req.body.login;
   const price = req.body.price;
   const type = req.body.type;
   const salelocation = req.body.salelocation;
   const id = req.body.id;


   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;

   db.on('error', console.error.bind(console, 'Connection error:'));

   db.once('open', async () => {
       console.log('Connected to MongoDB!');

       try {
           let result = await mongoose.connection.db.collection('products').updateOne(
               { _id: new ObjectId(id) },
               { $set: { login: login, price: price, type: type, salelocation: salelocation } }
           );

           res.redirect("/");
       } catch (error) {
           console.error('Error updating product:', error);
       } finally {
           mongoose.connection.close();
       }
   });
});

app.get("/*", function (req, res) {
   res.send("404 not found");
});

app.listen(3000, function () {
   console.log("Example is running on port 3000");
});
