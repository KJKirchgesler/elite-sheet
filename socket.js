const db = require("./models");

module.exports = function(wss) {
	db.Transaction.addHook("afterSave", liveUpdate);
	db.Transaction.addHook("afterDestroy", liveUpdate);

	wss.on("connection", () => console.log("Socket connected"))

	function liveUpdate(inst, opts) {
		wss.emit("transactionChanged", inst.get({plain: true}));
	}
}