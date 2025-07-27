var express = require("express");

const {
  getUserController,
  createUserController,
  loginHandleController,
} = require("../controller/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", getUserController);
router.post("/create", createUserController);
router.post("/login", loginHandleController);

module.exports = router;
