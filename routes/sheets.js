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

router.get("/viewsheet/:sheetid", function(req, res) {
 	console.log(req.body)
 	let sheetid = req.params.sheetid;
 	let userData = req.user;

 	if(req.user.name === undefined) {
 		res.status(401).send("user not logged in");
 		return;
 	} else {
 		console.log("user is signed in")
 	}

 	db.UserSheet.findOne({
 		where: {
 			userId: userData.id,
 			sheetId: sheetid
 		}
 	}).then(function(result) {
 		console.log("user " + userData.name + " has access to sheet " + sheetid);

 		db.Sheet.find({
			where: {
				id: sheetId
			},
			include: [{
				model: db.Transaction,
				as: 'Transaction',
				required: false,
				attributes: ['id',
										 'companyName',
										 'invoiceNumber',
										 'vendorNumber',
										 'itemNumber',
										 'creditNumber',
										 'debitNumber',
										 'totalBalance',
										 'dueDate',
										 'amountPastDue',
										 'departmentName',
										 'locationName',
										 'representativeName'],
			}]	
		}).then(function(result) {
			let transactions = [];
			for (i = 0; i < result.dataValues.Transaction.length; i++) {
				transactions.push(result.dataValues.Transaction[i].dataValues);
			}
			console.log("transactions for sheet " + sheetId)
			console.log(transactions)
			res.json(transactions);
		})

 	}).catch(function(result) {
 		res.status(401).send("user does not have access to this sheet")
 	})
});

router.get("/getUsers", function(req, res) {
	db.User.find()
	.then(function(result) {
		console.log("thing")
		res.json(userData);
	})
	
});

router.get("/viewCollaborators/:sheetId", function(req, res) {
	// console.log(req.body)
	const {sheetId} = req.params;
	db.UserSheet.findAll({
		where: {sheetId},
		include: ['User']
	}).then((result) => {
		res.json(result);
	}).catch(function(err) {
		console.log(err);
		res.send(err);
	})
});

module.exports = router;