const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.use(routes);

var passport = require("./config/passport");
var db = require("./models");

var session = require("express-session");
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync({force: true}).then(function() {
	app.listen(PORT, function() {
		console.log("API Server now listening on PORT " + PORT)
	});
});