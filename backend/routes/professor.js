var express = require("express");
var router = express.Router();

router.get("/test", function (req, res, next) {
  res.json({
    name: "professor name",
    college: "islington college",
    tech: ["Javascript", "Express", "React"],
  });
});

router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  res.json({
    id: id,
    name: "Dr Smith",
    college: "Islington College",
    tech: ["Javascript", "Express", "React"],
  });
});
module.exports = router;
