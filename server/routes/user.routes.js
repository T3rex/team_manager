const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.ctrl");

router.get("/", userCtrl.getAll);

module.exports = router;
