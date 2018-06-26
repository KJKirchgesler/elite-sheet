const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const appnext = next({ dev });
const handle = appnext.getRequestHandler();

var bodyParser = require("body-parser");
var session = require("express-session");

var passport = require("./config/passport");
var db = require("./models");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

appnext.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    db.sequelize.sync().then(function() {
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Ready on http://localhost:${port}`);
      });
    });
});

