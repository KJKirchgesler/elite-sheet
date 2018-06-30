var db = require("../models");
var passport = require("../config/passport");
const router = require("express").Router();


router.post("/login", passport.authenticate("local"), function(req, res) {
	console.log(req.body);
  res.json("/");
});

router.post("/signup", function(req, res) {
	// console.log("inside signup controller!");
	// console.log(req.body);
	db.User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  }).then(function(res) {
    console.log("user created!");
    console.log(res.dataValues);
    res.redirect(307, "/auth/login");
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    res.status(422).json(err.errors[0].message);
  });
});

router.get("/logout", function(req, res) {
  req.logout();
  console.log("user logged out");
  res.send("user logged out");
});

router.get("/userdata", function(req, res) {
  if (!req.user) {
    res.json({});
  }
  else {
    //console.log(req.user)
    res.json({
      email: req.user.email,
      id: req.user.id, 
      name: req.user.name
    });
  }
});

module.exports = router;