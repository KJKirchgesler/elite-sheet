import axios from "axios";

export default {
	signup: function(userData) {
		return axios.post("/auth/signup", userData);
	},

	login: function(userData) {
		return axios.post("/auth/login", userData);
	},

	logout: function(userData) {
		return axios.get("/auth/logout");
	},

	getUserData: function() {
		return axios.get("/auth/userdata");
	},

	forgotPassword: function(userData) {
		return axios.post("/auth/forgotPassword", userData);
	},

	resetPassword: function(userData) {
		return axios.post("/auth/resetPassword", userData);
	},

	createSheet: function(sheetData) {
		return axios.post("/createsheet", sheetData)
	},

	viewCreatedSheets: function() {
		return axios.get("/viewcreated");
	},

	viewSharedSheets: function() {
		return axios.get("/viewshared");
	},

	viewOtherUsers: function() {
		return axios.get("/getUsers");	
	}, 

	grantAccess: function(sheetData) {
		return axios.post("/grantaccess");
	},

	withdrawAccess: function(sheetData) {
		return axios.delete("/withdrawaccess/" + sheetData.sheetId + "/" + sheetData.otherUserId + "/" + sheetData.creatorUserId);
	},

	createTransaction: function(sheetData) {
		return axios.get("/createtransaction", sheetData);
	},

	viewSheet: function(sheetData) {
		return axios.get("/viewsheet/" + sheetData.sheetId + "/" + sheetData.userId);
	},

	viewCollaborators: function(sheetId) {
		return axios.get("/viewCollaborators/" + sheetId)
	}

}