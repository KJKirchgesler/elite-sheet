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
	}
}