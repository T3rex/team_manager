const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.ctrl");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

module.exports = router;
