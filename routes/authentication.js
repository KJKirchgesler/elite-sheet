const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const sgMail = require("@sendgrid/mail")
const sendgridAPIkey = require("../sendgrid-api-key.js")
const crypto = require("crypto");
const Op = require("sequelize").Op
// const Op = Sequelize.Op;


router.post("/login", passport.authenticate("local"), function(req, res) {
	//console.log(req.body);
  res.status(200).send("user logged in");
});

router.post("/signup", function(req, res) {
	db.User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  }).then(function(result) {
    console.log("user created!");
    //console.log(result.dataValues);
    res.status(200).send("new user added");
  }).catch(function(err) {
    console.log(err);
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

router.post("/forgotPassword", function(req, res, next) {
  let token;
  let userEmail = req.body.email;
  
  crypto.randomBytes(20, function(err, buf) {
    token = buf.toString("hex");
  });

  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(result) {
    if (!result) {
      result.send("Error: No account with that email address exists.")
    } else {
      db.User.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000
      },
      {
        returning: true,
        where: {
          email: req.body.email
        }
      }).then(function(result) {
        console.log("reset password token and reset expiration date set");

        const sgMail = require('@sendgrid/mail');
        
        sgMail.setApiKey(sendgridAPIkey);
        
        const msg = {
          to: userEmail,
          from: 'resetpassword@elitesheets.com',
          subject: 'eliteSheets Password Reset',
          text: "You are receiveing this because you (or someone else) have requested a reset of the password for your account.\n\n" + 
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" + 
          "http://" + req.headers.host + "/reset/" + token + "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n\n",
        }

        sgMail.send(msg);
        console.log("email sent to " + userEmail);
        res.status(200).send("Email sent to " + userEmail)

      }).catch(function(err) {
        console.log(err)
        res.json(err);
      });  
    }

  }).catch(function(err) {
    console.log(err)
    res.json(err)
  });
})

router.post("/resetPassword", function(req, res) {
  let newPassword = req.body.password;
  let passwordToken = req.body.passwordToken;

  db.User.findOne({
    where: {
      resetPasswordToken: passwordToken,
      resetPasswordExpires: {
        [Op.gt]: Date.now()
      }
    }
  }).then(function(user) {
    
    user.update({
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    }).then(function(result) {
      console.log("password updated");

      const sgMail = require('@sendgrid/mail');
        
      sgMail.setApiKey(sendgridAPIkey);
      
      const msg = {
        to: user.email,
        from: 'resetpassword@elitesheets.com',
        subject: 'Your eliteSheets password has been changed',
        text: "Hello eliteSheets user,\n\n"
        + "This is a confirmation that the password for the eliteSheets account with the email " + user.email + " has been changed." +
        "\n\nIf you did not intend to change your password, please proceed to the eliteSheets login page and click 'Forgot my password.'",
      }

      sgMail.send(msg);
      console.log("confirmation email sent to " + user.email);
      res.status(200).send("Email sent to " + user.email)
    }).catch(function(err) {
      console.log("there was an error updating the user's password")
      res.json({error: "there was an error updating the user's password"});
    })

  }).catch(function(err) {
    console.log("there was an error updating the user's password")
    res.json({error: "there was an error updating the user's password"});
  })
});

module.exports = router;