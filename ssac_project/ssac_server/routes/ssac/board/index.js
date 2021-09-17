const express = require("express");
const router = express.Router();
const BoardController = require("../../../controllers/ssac/board/BoardController");

router.get("/", BoardController.readAlldata);

router.get("/:idx", BoardController.readIdxdata);

router.post("/", BoardController.saveData);

router.delete("/:idx", BoardController.deleteData);

module.exports = router;
