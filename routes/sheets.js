var db = require("../models");
const router = require("express").Router();

router.post("/createsheet", function(req, res) {
	// console.log("inside create sheet route");
 	
	let newSheetName = req.body.newSheetName;
	let userId = req.user.id;

	//create a row in the Sheet table with the name of the new sheet
 	db.Sheet.create({
 		name: newSheetName
 	}).then(function(result) {
	 	console.log("sheet created named " + newSheetName);
	 	let newSheetData = result.dataValues;
		console.log("new sheet id is " + newSheetData.id);

		//Create a row in the UserSheet table which records the id of the user, the id of the newly created sheet, and lists the user as the creator of this sheet
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

	//finds all the sheets that the user himself as created, along with any collaborators
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
	//finds all of the user's shared sheets that he didn't create but has access to, along with any collaborators
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
	console.log(req.body)
	//Check if the session id matches the request user id
	let sessionUserId = req.user.id;
	let requestUserId = req.body.creatorUserId;
console.log(typeof sessionUserId);
		console.log(typeof requestUserId);
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

	if (sessionUserId !== parseInt(requestUserId, 10)) {
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

router.post("/createtransaction", function(req, res) {
	console.log(req.body);

	//format for dummy data to submit via insomnia/postman:
	// {
	// 	"companyName": "Bob",
	// 	"invoiceNumber": "002023",
	// 	"vendorNumber": "23134",
	// 	"itemNumber": 345634,
	// 	"creditNumber": "34jk1343",
	// 	"totalBalance": 123.23,
	// 	"dueDate": "2018-07-11 13:38:58",
	// 	"amountPastDue": "2018-07-11 13:38:58",
	// 	"departmentName": "Sales",
	// 	"locationName": "City of choice",
	// 	"representativeName": "Bobby Jr",
	// 	"sheetId": 1
	// }

	//*When this is really working, companyName will be equivalent to the name of the user who is creating the transaction. So something like:
	//let companyName = req.user.name

  db.Transaction.create({
			companyName: req.body.companyName,//in production, req.user.name
		 	invoiceNumber: req.body.invoiceNumber,
			vendorNumber: req.body.vendorNumber,
			itemNumber: req.body.itemNumber,
			creditNumber: req.body.creditNumber,
			totalBalance: req.body.totalBalance,
			dueDate: req.body.dueDate,
			amountPastDue: req.body.amountPastDue,
			departmentName: req.body.departmentName,
			locationName: req.body.locationName,
			representativeName: req.body.representativeName,
			sheetId: req.body.sheetId
	}).then(function(dbTransaction) {
		console.log("new transaction created");
		res.status(200).send("new transaction created");
	}).catch(function (err) {
		console.log(err);
		res.status(500).send("server error")
	});
});

router.delete("/deletetransaction/:sheetId/:transactionId/:userId", function(req, res) {
	
	//Check to see if the user is signed in with the same userid in the URL
	let sessionUserId = req.user.id;//*make sure this works later on*
	let requestUserId = req.params.userId;

	if (sessionUserId !== requestUserId) {
		console.log('user ids do not match')
		res.status(401).send("session user id and request user id do not match");
		return;
	}

	let transactionId = req.params.transactionId;
	let sheetId = req.params.sheetId;

	//check to see if the user has access to the sheet the transaction is in
	db.UserSheet.findOne({
		where: {
			sheetId: sheetId,
			userId: sessionUserId
		}
	}).then(function(result) {

		//check to see if the user himself created the transaction in question
		db.Transaction.findOne({
			where: {
				companyName: req.user.name,
				id: transactionId
			}
		}).then(function(result) {
			
			//delete the transaction
			db.Transaction.destroy({
				where: {
					id: transactionId
				}
			}).then(function(result) {
				console.log('transaction deleted with id' + req)
				res.status(200).send("transaction deleted")
			}).catch(function (err) {
				console.log(err);
				res.json(err);
			});

		}).catch(function(err) {
			console.log('either the user did not create this transaction, or the transaction under this id does not exist');
			res.json(err)
		})
		
	}).catch(function(err) {
		console.log('the user does not have access to the sheet this transaction is in')
		console.log(err);
		res.json(err);
	});
});

router.get("/viewsheet/:sheetId/:userId", function(req, res) {
	let sessionUserId = req.body.id;//*make sure this works later on*
	let requestUserId = req.body.userId;

	if (sessionUserId !== requestUserId) {
		console.log('user ids do not match')
		res.status(401).send("session user id and request user id do not match");
		return;
	}

	console.log("data submitted to find transactions for a sheet:")

	let userId = req.params.userId;
	let sheetId = req.params.sheetId;

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
										 'totalBalance',
										 'dueDate',
										 'amountPastDue',
										 'departmentName',
										 'locationName',
										 'representativeName',
										 'SheetId'],
			}]	
		}).then(function(result) {
			console.log("transactions found")
			// console.log(result.dataValues)
			res.json(result);
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

router.get("/viewCollaborators/:sheetId", function(req, res) {
	//console.log(req.body)
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

router.get("/getSheetData/:sheetId", function(req, res) {
	const sheetId = req.params.sheetId;
	console.log("here is the sheet id")
	console.log(sheetId);

	db.Sheet.findOne({
		where: {
			id: sheetId
		}
	}).then(function(result) {
		//console.log(result);
		res.json(result);
	}).catch(function(err) {
		console.log(err);
		res.json(err);
	});
})

router.delete("/deletesheet/:sheetId/:userId/", function(req, res) {
	console.log(req.user)
	let sessionUserId = req.user.id;//*make sure this works later on*
	let requestUserId = req.params.userId;

	if (sessionUserId !== parseInt(requestUserId, 10)) {
		console.log('user ids do not match')
		res.status(401).send("session user id and request user id do not match");
		return;
	}

	let sheetId = req.params.sheetId;

	//check to see if user is the creator of this sheet and has permission to delete it
	db.UserSheet.findOne({
		where: {
			sheetId: sheetId,
			userId: req.params.userId,
			userIsCreator: true
		}
	}).then(function(result) {

		//delete all usersheet records associated with this sheet
		db.UserSheet.destroy({
			where: {
				sheetId: sheetId
			}
		}).then(function(result) {
			//delete the sheet table record with the sheetId in question
			db.Sheet.destroy({
				where: {
					id: sheetId
				}
			}).then(function(result) {

				db.Transaction.destroy({
					where: {
						sheetId: sheetId
					}
				}).then(function(result) {
					console.log('all records for this sheet deleted from usersheets, transactions, and sheets tables')
					res.status(200).send('all records for this sheet deleted from usersheets, transactions, and sheets tables')
				}).catch(function(err) {
					console.log(err)
					res.json(err);
				})

			}).catch(function(err) {
			console.log(err)
			res.json(err);
		})

		}).catch(function(err) {
			console.log(err)
			res.json(err);
		})

	}).catch(function(err) {
		console.log("user is not the creator of this sheet and does not have permission to delete it")
		console.log(err)
		res.json(err);
	})
});
module.exports = router;