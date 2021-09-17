const express = require("express");
const router = express.Router();

const boardRouter = require("./board/index");

const AuthController = require("../../controllers/ssac/auth/AuthController");

router.post("/signup", AuthController.signup);

router.post("/signin", AuthController.login);

router.use("/board", boardRouter);

module.exports = router;
