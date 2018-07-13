const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;
const db = require("./models");

let app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.use(session({ 
	secret: "keyboard cat", 
	resave: true, 
	saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'))

app.use(routes);

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("API Server now listening on PORT " + PORT)
	});
});