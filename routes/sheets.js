var db = require("../models");
const router = require("express").Router();

router.post("/createsheet", function(req, res) {
	// console.log("inside create sheet route");
	// console.log(req.body)
 	
	let newSheetName = req.body.newSheetName;
	let userId = req.body.userId;

 	db.Sheet.create({
 		name: newSheetName
 	}).then(function(result) {
	 	console.log("sheet created named " + newSheetName);
	 	let newSheetData = result.dataValues;
		console.log("new sheet id is " + newSheetData.id);

		db.UserSheet.create({
			userId: userId,
			sheetId: newSheetData.id,
			userIsCreator: true
		}).then(function(result) {
			console.log("usersheet entry added with new sheet id, user id, and user marked creator")
			newUserSheetRow = result.dataValues;

			let sheetData = {
				name: newSheetData.name,
				userId: newUserSheetRow.userId,
				userIsCreator: newUserSheetRow.userIsCreator,
				sheetId: newUserSheetRow.sheetId
			}
			res.json(sheetData);
		}).catch(function (err) {
			console.log(err);
			res.status(400).send("there was a server error")
		});

  }).catch(function (err) {
		console.log(err);
		res.status(400).send("there was a server error")
	});
});

router.get("/viewcreated", function(req, res) {
	// console.log("inside view created route")
	// console.log(req.user)
	let userId = req.user.id;

	db.User.find({
		include: [{
			model: db.Sheet,
			as: 'Sheet',
			required: false,
			attributes: ['id', 'name'],
			through: {
				attributes: [],
				where: {userIsCreator: true}
			},
		}],
		where: userId
	}).then(function(result) {
		let sheets = [];
		for (i = 0; i < result.dataValues.Sheet.length; i++) {
			sheets.push(result.dataValues.Sheet[i].dataValues);
		}
		res.json(sheets);
	}).catch(function (err) {
		console.log(err);
		res.json(err);
	});
});

router.get("/viewshared", function(req, res) {
	let userId = req.user.id;
 	// console.log(req.body)
 	db.User.find({
		include: [{
			model: db.Sheet,
			as: 'Sheet',
			required: false,
			attributes: ['id', 'name'],
			through: {
				attributes: [],
				where: {userIsCreator: false}
			},
		}],
		where: userId
	}).then(function(result) {
		let sheets = [];
		for (i = 0; i < result.dataValues.Sheet.length; i++) {
			sheets.push(result.dataValues.Sheet[i].dataValues);
		}
		console.log("shared sheets for user " + userId)
		console.log(sheets)
		res.json(sheets);
	}).catch(function (err) {
		console.log(err);
		res.json(err);
	});
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
	//console.log(req.body);
	var Transaction = {};
	
	 db.Transaction.create({
		 where: {
			 transaction: {
				companyName: companyName,
			 	invoiceNumber: invoiceNum,
				vendorNumber: vendorId,
				itemNumber: itemNumber,
				creditNumber: creditNumber,
				debitNumber: debitNumber,
				totalBalance: totalBalance,
				dueDate: dueDate,
				amountPastDue: amountPastDue,
				departmentName: departmentName,
				locationName: locationName,
				representativeName: representativeName,
				SheetId: sheetId
				 }
			}
		}).then(function(dbTransaction) {
		res.json(userData);
		console.log(req.body);
		}).catch(function (err) {
		console.log(err);
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


//delete route transaction, sheet records, user sheet