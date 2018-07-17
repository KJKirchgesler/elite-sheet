const path = require("path");
const router = require("express").Router();
const authRoutes = require("./authentication.js");
const sheetRoutes = require("./sheets.js")

router.use("/api/auth", authRoutes);
router.use("/api/", sheetRoutes)

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

module.exports = router;