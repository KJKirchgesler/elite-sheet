var db = require("./models");

//create a sheet and tag the logged in user as the creator
function createSheet(sheetName, userId) {
 	db.Sheet.create({
 		name: sheetName
 	}).then(function(result) {
	 	console.log("sheet created named " + sheetName);
	 	let newSheetId = result.dataValues.id;
		console.log("new sheet id is " + newSheetId);

		db.UserSheet.create({
			userId: userId,
			sheetId: newSheetId,
			userIsCreator: true
		}).then(function(result) {
			console.log("usersheet entry added with new sheet id, user id, and user marked creator")
			console.log(result.dataValues);
		}).catch(function (err) {
			console.log(err);
		});

  }).catch(function (err) {
		console.log(err);
	});
}

// createSheet("bob's big sheet", 1)
// createSheet("steve's sheet", 2)

//displays the names of all the sheets a user has created
function viewCreatedSheets(userId) {
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
		console.log('----------Here are all created sheets for user ' + userId)
		console.log(sheets)
	}).catch(function (err) {
		console.log(err);
	});
}

//viewCreatedSheets(2);

//displays the names of all the sheets a users has not created but has access to
function viewSharedSheets(userId) {
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
	}).catch(function (err) {
		console.log(err);
	});
}

//viewSharedSheets(1);

//give another user access to a sheet
//in production, this function should take another parameter of
//logged in user's id to check whether this user is the creator
//of the sheet and is allowed to grant access
function grantAccess(sheetId, sharedUserId) {
	db.UserSheet.create({
		userId: sharedUserId,
		sheetId: sheetId,
		userIsCreator: false
	}).then(function(result) {
		console.log("access granted to sheet " + sheetId + " for user " + sharedUserId);
		console.log(result.dataValues);
	}).catch(function (err) {
		console.log(err);
	});
}

//grantAccess(2, 1);

//withdraw access to a sheet from a user who doesn't have access to the sheet
//again, in production we need to check whether the user withdrawing access
//is the creator -- do this by searching to see if there is a line saying this
function withdrawAccess(sheetId, sharedUserId) {
	db.UserSheet.destroy({
		where: {
			sheetId: sheetId,
			userId: sharedUserId,
			userIsCreator: false
		}
	}).then(function(result) {
		console.log('access withdrawn to sheet ' + sheetId + ' for user ' + sharedUserId)
	}).catch(function (err) {
		console.log(err);
	});
}

// withdrawAccess(2, 1);

//create a transaction in a sheet
function createTransaction(companyName, companyId, invoiceNum, vendorId, total, sheetId) {
	db.Transaction.create({
		companyName: companyName,
		companyId: companyId,
		invoiceNumber: invoiceNum,
		vendorId: vendorId,
		total: total,
		SheetId: sheetId
	}).then(function(result) {
		console.log('new transaction created for sheet ' + sheetId);
	}).catch(function (err) {
		console.log(err);
	});
}

// createTransaction("Bob", "1234", "1234", 123.32, 1)
// createTransaction("Steve", "1234", "1234", 234.32, 1)

//view a sheet with all its transactions
//later on, include authorization for viewing a sheet by looking
//to see if the usersheet table has an entry with the correct
//userId, SheetId, and is marked as creator and this matches
//with the id stored in session
function viewSheet(sheetId) {
	db.Sheet.find({
		where: {
			id: sheetId
		},
		include: [{
			model: db.Transaction,
			as: 'Transaction',
			required: false,
			attributes: ['id', 'companyName', 'companyId', 'invoiceNumber', 'vendorId', 'total', 'SheetId' ],
			
		}]	
	}).then(function(result) {
		let transactions = [];
		for (i = 0; i < result.dataValues.Transaction.length; i++) {
			transactions.push(result.dataValues.Transaction[i].dataValues);
		}
		//sheet totals for each company can be pulled for each company 
		//by accessing the total in each transaction
		console.log("transactions for sheet " + sheetId)
		console.log(transactions)
	})
}

//viewSheet(1);

function createSheetAuthorized(sheetName, userId) {
 	db.Sheet.create({
 		name: sheetName
 	}).then(function(result) {
	 	console.log("sheet created named " + sheetName);
	 	let newSheetId = result.dataValues.id;
		console.log("new sheet id is " + newSheetId);

		db.UserSheet.create({
			userId: userId,
			sheetId: newSheetId,
			userIsCreator: true
		}).then(function(result) {
			console.log("usersheet entry added with new sheet id, user id, and user marked creator")
			console.log(result.dataValues);
		}).catch(function (err) {
			console.log(err);
		});
		
  }).catch(function (err) {
		console.log(err);
	});
}