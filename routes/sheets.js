var db = require("../models");
const router = require("express").Router();

router.post("/createsheet", function(req, res) {
	console.log(req.body);
 	res.json(sheetData);
});

router.get("/viewcreated", function(req, res) {
	console.log(req.body)
});

router.get("/viewshared", function(req, res) {
 	console.log(req.body)
 	res.json(sheetData);
});

router.get("/grantaccess", function(req, res) {
 	console.log(req.body)
 	res.json(userData);
});

router.get("/withdrawaccess", function(req, res) {
 	console.log(req.body)
 	res.json(userData);
});

router.get("/createtransaction", function(req, res) {
 	console.log(req.body)
 	res.json(userData);
});

router.get("/viewsheet", function(req, res) {
 	console.log(req.body)
 	res.json(userData);
});

router.get("/getUsers", function(req, res) {
	console.log(req.body)
	res.json(userData);
});

router.get("/viewCollaborator", function(req, res) {
	console.log(req.body)
	res.json(userData);
});

module.exports = router;