var express = require("express");
var router = express.Router();

const ssacRouter = require("./ssac/index");

router.use("/ssac", ssacRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
