router.post("/forgotPassword", function(req, res, next) {
  let token;
  let userEmail = req.body.email;

  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        token = buf.toString("hex");
        done(err, token);
      });
    },

    function(token, done) {
      db.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(res) {
        if (!res) {
          res.send("Error: No account with that email address exists.")
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
          }).then(function(res) {
            console.log("reset password token and reset expiration date set");
            done(userEmail);
          }).catch(function(err) {
            console.log(err)
            res.json(err);
          });  
        }
      }).catch(function(err) {
        console.log(err)
        res.json(err)
      });
      
    },

    function(token, userEmail, done) {
      console.log("entered email function")
      let smtpTransport = nodemailer.createTransport("SMTP", {
        service: "SendGrid",
        auth: {
          user: "!!!USERNAME",
          pass: "!!PASSWORD"
        }
      });

      let mailOptions = {
        to: user.email,
        from: "passwordrest@elitesheets.com",
        subject: "eliteSheets Password Reset",
        text: "You are receiveing this because you (or someone else) have requested a reset of the password for your account.\n\n" + 
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" + 
          "http://" + req.headers.host + "/reset/" + token + "\n\n" +
          "If you did not request this, please ignore this email and your password will be unchanged.\n\n"
      };

      smtpTransport.sendMail(mailOptions, function (err) {
        console.log("an email has been sent to " + user.email + 
          " with instructions to reset password")
        done(err, "done");
      })
    }

    ], function(err) {
      if (err) return next(err);
      res.json({"message": "An email has been sent to " + user.email + "."});
    })
})