const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../config");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//dummy data
const username = "admin";
const countries = ["Nigeria", "Ghana", "Egypt"];

//login with query string eg. http://localhost:3000/api/login?username=admin&password=admin
router.post("/login", (req, res) => {
  let psw = req.query.password;
  let user = req.query.username;
  if (psw !== username || user !== username) {
    res.status(401).send("Incorrect Username or Password");
  } else {
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }
});

router.get("/countries", (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    res.status(200).send(countries);
  });
});

//add countries as query parameter e.g http://localhost:3000/api/countries/Togo
router.put("/countries/?:country", (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    let country = req.params.country;
    res.status(200).send(countries);
  });
});

//delete countries as query parameter e.g http://localhost:3000/api/countries/Togo
router.delete("/countries/?:country", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    let country = req.params.country;
    countries.pop(country);
    res.status(200).send(countries);
  });
});

module.exports = router;
