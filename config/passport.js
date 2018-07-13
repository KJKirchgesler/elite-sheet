var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;
const utils = require("../routes/utils.js");

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.use(new RememberMeStrategy(
  function(token, done) {
    db.RememberMeTokens.destroy({
      where: {
        token: token
      }
    }).then(function(tokenRow) {

      db.User.findOne({
        where: {
          id: tokenRow.userId
        }
      }).then(function(user) {
        return done(null, user)
      }).catch(function(err) {
        console.log(err);
      })


    }).catch(function(err) {
      console.log(err)
    })
  },
  function(user, done) {
    var token = utils.randomString(64)

    db.RememberMeTokens.create({
      token: token,
      userId: req.user.id
    }).then(function(result) {
      res.cookie("remember_me", result.dataValues.token, {path: "/", httpOnly: true, maxAge: 604800000})
      return next();
    }).catch(function(err) {
      console.log(err)
    })
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
