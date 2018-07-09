const path = require("path");
const router = require("express").Router();
const authRoutes = require("./authentication.js");
const sheetRoutes = require("./sheets.js")

router.use("/auth", authRoutes);
router.use("/", sheetRoutes)

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

module.exports = router;