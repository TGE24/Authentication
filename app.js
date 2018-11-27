const express = require("express");
const app = express();
var port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//view engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//connect to db
var databaseUrl = "mongodb://tg:24test@ds147890.mlab.com:47890/auth";
mongoose.connect(
  databaseUrl,
  { useNewUrlParser: true }
);

//create a schema
var userSchema = new mongoose.Schema({
  email: String,
  psw: String
});

var User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then(item => {
      res.render("login");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

app.get("/login", (req, res, next) => {
  User.find({}, (err, user) => {
    if (err) throw err;
    res.render("login");
  });
});

//listen to the selected port
app.listen(3000);
console.log(`Server is running on port 3000`);
