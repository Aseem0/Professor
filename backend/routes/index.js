var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/testing", function (req, res, next) {
  //res.send("This is the second router");
  res.json({
    name: "John Doe",
    age: 30,
    tech: ["Javascript", "python"],
  });
});

module.exports = router;
