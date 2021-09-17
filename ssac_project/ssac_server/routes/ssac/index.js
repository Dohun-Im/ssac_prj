var express = require("express");
var router = express.Router();

const authRouter = require("./auth/index");
const boardRouter = require("./board/index");

router.use("/auth", authRouter);
router.use("/board", boardRouter);

module.exports = router;
