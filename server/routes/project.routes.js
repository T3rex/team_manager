const express = require("express");
const router = express.Router();
const projectCtrl = require("../controllers/project.ctrl");
const {
  verifyToken,
  authorizeRoles,
} = require("../middleware/auth.middleware");

router.get("/", verifyToken, projectCtrl.getAll);
router.get("/:id", verifyToken, projectCtrl.getById);
router.post("/", verifyToken, authorizeRoles("Admin"), projectCtrl.create);
router.delete("/:id", verifyToken, authorizeRoles("Admin"), projectCtrl.delete);

module.exports = router;
