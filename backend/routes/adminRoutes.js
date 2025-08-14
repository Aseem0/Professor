var express = require("express");
const {
  createQuestionSetController,
} = require("../controller/adminController");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
var router = express.Router();

router.post(
  "/questionset/create",
  validateTokenMiddleware,
  createQuestionSetController
);

module.exports = router;
