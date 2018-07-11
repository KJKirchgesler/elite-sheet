var db = require("../models");
const router = require("express").Router();

router.post("/createsheet", function(req, res) {
	// console.log("inside create sheet route");
	// console.log(req.user)
 	
	let newSheetName = req.body.newSheetName;
	let userId = req.user.id;

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
	let userId = req.user.id;

	db.UserSheet.findAll({
		include: [{
			model: db.Sheet,
			as: 'Sheet',
			required: false,
			attributes: ['id', 'name'],
			include: [{
				model: db.User,
				as: "User",
				attributes: ["id", "email", "name"],
				through: {
					attributes: ["userIsCreator"]
				}
			}]
		}],
		where:{
			userId: userId,
			userIsCreator: true
		}
	}).then(function(result) {
		result = result.map(inst => inst.get({plain: true}));
		require("util").inspect.defaultOptions.depth = 10;
		console.log(result)
		res.json(result);
	}).catch(function (err) {
		console.log(err);
		res.json(err);
	});
});

router.get("/viewshared", function(req, res) {
	let userId = req.user.id;
 	// console.log(req.body)
 	db.UserSheet.findAll({
		include: [{
			model: db.Sheet,
			as: 'Sheet',
			required: false,
			attributes: ['id', 'name'],
			include: [{
				model: db.User,
				as: "User",
				attributes: ["id", "email", "name"],
				through: {
					attributes: ["userIsCreator"]
				}
			}]
		}],
		where:{
			userId: userId,
			userIsCreator: false
		}
	}).then(function(result) {
		result = result.map(inst => inst.get({plain: true}));
		require("util").inspect.defaultOptions.depth = 10;
		console.log(result)
		res.json(result);
	}).catch(function (err) {
		console.log(err);
		res.json(err);
	});
});

router.post("/grantaccess", function(req, res) {

	//Check if the session id matches the request user id
	let sessionUserId = req.user.id;
	let requestUserId = req.body.creatorUserId;

	if (sessionUserId !== requestUserId) {
		console.log('user ids do not match')
		res.status(401).send("session user id and request user id do not match");
		return;
	}

 	let userId = req.user.id;
 	//console.log(req.body)
 	let otherUserId = req.body.otherUserId;
 	let sheetId = req.body.sheetId;

 	//make sure the user granting access is the creator
 	db.UserSheet.findOne({
 		where: {
 			userId: userId,
 			sheetId: sheetId,
 			userIsCreator: true
 		}
 	}).then(function(result) {

 		//create a record granting access to the other user
 		db.UserSheet.create({
			userId: otherUserId,
			sheetId: sheetId,
			userIsCreator: false
		}).then(function(result) {
			console.log("access granted to sheet " + sheetId + " for user " + otherUserId);
			console.log(result.dataValues);
			res.status(200).send("access granted to user " + otherUserId);
		}).catch(function (err) {
			console.log(err);
			res.json(err);
		});

 	}).catch(function(err) {
 		console.log(err);
 		res.json(err);
 	})
});

router.delete("/withdrawaccess/:sheetId/:otherUserId/:creatorUserId", function(req, res) {
	//Check if the session id matches the request user id
	let sessionUserId = req.user.id;//*make sure this works later on*
	let requestUserId = req.params.creatorUserId;

	if (sessionUserId !== requestUserId) {
		console.log('user ids do not match')
		res.status(401).send("session user id and request user id do not match");
		return;
	}

	let userId = req.user.id;//*make sure this works later on*
 	//console.log(req.body)
 	let otherUserId = req.params.otherUserId;
 	let sheetId = req.params.sheetId;

	//make sure the user withdrawing access is the creator
 	db.UserSheet.findOne({
 		where: {
 			userId: userId,
 			sheetId: sheetId,
 			userIsCreator: true
 		}
 	}).then(function(result) {

 		//delete the record granting access to this sheet
 		db.UserSheet.destroy({
 			where: {
 				userId: otherUserId,
				sheetId: sheetId,
				userIsCreator: false
 			}
		}).then(function(result) {
			console.log("access withdrawn from sheet " + sheetId + " for user " + otherUserId);
			res.status(200).send("access withdrawn from user " + otherUserId);
		}).catch(function (err) {
			console.log(err);
			res.json(err);
		});

 	}).catch(function(err) {
 		console.log(err);
 		res.json(err);
 	});
});

router.get("/createtransaction", function(req, res) {
 	console.log(req.user)
 	res.json(userData);
});

router.get("/viewsheet", function(req, res) {
	let sessionUserId = req.user.id;//*make sure this works later on*
	let requestUserId = req.body.userId;

	if (sessionUserId !== requestUserId) {
		console.log('user ids do not match')
		res.status(401).send("session user id and request user id do not match");
		return;
	}

	let userId = req.user.id;
	let sheetId = req.body.sheetId;

 	db.UserSheet.findOne({
 		where: {
 			userId: userId,
 			sheetId: sheetId
 		}
 	}).then(function(result) {
 		console.log("user " + userId + " has access to sheet " + sheetId);

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

 	}).catch(function(err) {
 		console.log("user may not have access to this sheet")
 		console.log(err)
 		res.json(err);
 	})
});

router.get("/getUsers", function(req, res) {
	let userId;

	if (req.user) {
		userId = req.user.id;
	}

	db.User.findAll({})
	.then(function(result) {
		let users = [];
		for (i = 0; i < result.length; i++) {
			if (userId !== result[i].dataValues.id) {
				let newUser = {
				id: result[i].dataValues.id,
				email: result[i].dataValues.email,
				name: result[i].dataValues.name
			}
			users.push(newUser);
			}	
		}
		//console.log(users);
		res.json(users);
	})
	
});

// router.get("/viewCollaborators/:sheetId", function(req, res) {
// 	//console.log(req.body)
// 	const {sheetId} = req.params;
// 	db.UserSheet.findAll({
// 		where: {sheetId},
// 		include: ['User']
// 	}).then((result) => {
// 		res.json(result);
// 	}).catch(function(err) {
// 		console.log(err);
// 		res.send(err);
// 	})
// });

module.exports = router;