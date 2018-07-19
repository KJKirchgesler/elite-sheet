const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const webSocketServer = require("ws").Server;
const wsWrapper = require("ws-server-wrapper");
const http = require("http");
const webSocketBindings = require("./socket.js")

const PORT = process.env.PORT || 3001;
const db = require("./models");

let app = express();
const server = http.createServer(app);
const wss = new wsWrapper(new webSocketServer({server, path: "/socket"}));

webSocketBindings(wss);

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


db.sequelize.sync({force: true}).then(function() {
	server.listen(PORT, function() {
		console.log("API Server now listening on PORT " + PORT)
	});
});