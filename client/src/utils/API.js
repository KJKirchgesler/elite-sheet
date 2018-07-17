import axios from "axios";

export default {
	signup: function(userData) {
		return axios.post("/api/auth/signup", userData);
	},

	login: function(userData) {
		return axios.post("/api/auth/login", userData);
	},

	logout: function(userData) {
		return axios.get("/api/auth/logout");
	},

	getUserData: function() {
		return axios.get("/api/auth/userdata");
	},

	forgotPassword: function(userData) {
		return axios.post("/api/auth/forgotPassword", userData);
	},

	resetPassword: function(userData) {
		return axios.post("/api/auth/resetPassword", userData);
	},

	createSheet: function(sheetData) {
		return axios.post("/api/createsheet", sheetData)
	},

	viewCreatedSheets: function() {
		return axios.get("/api/viewcreated");
	},

	viewSharedSheets: function() {
		return axios.get("/api/viewshared");
	},

	viewOtherUsers: function() {
		return axios.get("/api/getUsers");	
	}, 

	grantAccess: function(sheetData) {
		return axios.post("/api/grantaccess");
	},

	withdrawAccess: function(sheetData) {
		return axios.delete("/api/withdrawaccess/" + sheetData.sheetId + "/" + sheetData.otherUserId + "/" + sheetData.creatorUserId);
	},

	createTransaction: function(sheetData) {
		return axios.get("/api/createtransaction", sheetData);
	},

	viewSheet: function(sheetData) {
		return axios.get("/api/viewsheet/" + sheetData.sheetId + "/" + sheetData.userId);
	},

	viewCollaborators: function(sheetId) {
		return axios.get("/api/viewCollaborators/" + sheetId)
	},

	getSheetData: function(sheetId) {
		return axios.get("/api/getSheetData/" + sheetId);
	},

	deleteTransaction: function(transactionData) {
		return axios.delete("/api/deletetransaction/"+ transactionData.sheetId + "/" + 
			transactionData.transactionId + "/" + transactionData.userId)
	},

	deleteSheet: function(sheetData) {
		return axios.delete("/api/deletesheet/" + sheetData.sheetId + "/" + sheetData.userId)
	}

}