const express = require("express");
const router = express.Router();

rconst staticController = require("../controllers/staticController");

router.get("/", staticController.index);

module.exports = router;
