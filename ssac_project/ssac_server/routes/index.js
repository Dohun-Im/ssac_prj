var express = require("express");
var router = express.Router();

const ssacRouter = require("./ssac/index");

router.use("/ssac", ssacRouter);

module.exports = router;
