const express = require("express");
const router = express.Router();

const {
  createTable,
  getTables,
  toggleReservation,
  deleteTable
} = require("../controllers/tableController");

router.get("/", getTables);

router.post("/", createTable);

router.patch("/:id/reserve", toggleReservation);

router.delete("/:id", deleteTable);

module.exports = router;