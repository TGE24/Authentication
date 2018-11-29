const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var session = require("express-session");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "test",
    resave: true,
    saveUninitialized: false
  })
);

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

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/signup", (req, res) => {
  const { email, psw } = req.body;

  const userData = {
    psw: bcrypt.hashSync(psw, 5), // we are using bcrypt to hash our password before saving it to the database
    email
  };
  var myData = new User(userData);
  myData
    .save()
    .then(item => {
      res.status(200).send("signup successful");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

app.post("/login", (req, res) => {
  let { email, psw } = req.body;
  User.findOne({ email: email }, "psw email", (err, userData) => {
    if (!err) {
      let passwordCheck = bcrypt.compareSync(psw, userData.psw);
      if (passwordCheck) {
        req.session.user = {
          email: userData.email,
          id: userData._id
        };
        res.status(200).send("You are logged in, Welcome!");
      } else {
        res.status(401).send("incorrect password");
      }
    } else {
      res.status(401).send("invalid login credentials");
    }
  });
});

//listen to the selected port
app.listen(5000);
console.log(`Server is running on port 5000`);
