const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndex);

router.post("/submit", indexController.postIndex);

module.exports = router;
