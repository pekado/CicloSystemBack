const express = require("express");
const router = express.Router();
const RemindersController = require("../controllers/remindersController");
const auth = require("../middleware/auth");

router.get("/", auth, RemindersController.getReminders);

router.post("/", auth, RemindersController.createReminder);

router.put("/:id", auth, RemindersController.updateReminder);

router.delete("/:id", auth, RemindersController.deleteReminder);

module.exports = router;
