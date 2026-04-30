const express = require("express");
const router = express.Router();
const taskCtrl = require("../controllers/task.ctrl");

router.get("/", taskCtrl.getAll);
router.get("/:id", taskCtrl.getById);
router.get("/project/:projectId", taskCtrl.getByProjectId);
router.post("/", taskCtrl.create);
router.patch("/:id/status", taskCtrl.updateStatus);
router.delete("/:id", taskCtrl.delete);

module.exports = router;
