const express = require("express");
const router = express.Router();

const { createChefs, getChefs } = require("../controllers/chefController");

router.post("/", createChefs);

router.get("/", getChefs);

module.exports = router;