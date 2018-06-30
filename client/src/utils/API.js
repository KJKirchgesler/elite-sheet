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

	createSheet: function(sheetData) {
		return axios.post("/createsheet", sheetData)
	},

	viewCreatedSheets: function() {
		return axios.get("/viewcreated");
	},

	viewSharedSheets: function() {
		return axios.get("/viewshared");
	},

	grantAccess: function(userData) {
		return axios.post("/grantaccess");
	},

	withdrawAccess: function(userData) {
		return axios.delete("/withdrawaccess/" + userData.sheetId + "/" + userData.sharedUserId);
	},

	createTransaction: function(sheetData) {
		return axios.get("/createtransaction", sheetData);
	},

	viewSheet: function(sheetData) {
		return axios.get("/viewsheet", sheetData);
	},

}